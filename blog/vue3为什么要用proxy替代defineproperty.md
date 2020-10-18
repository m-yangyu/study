# vue3为什么要用proxy替代defineProperty

在这之前，我们得先了解下vue的核心理念`mutable`

不管是vue2还是vue3，在实现的过程中，核心概念一直保持稳定，以可变数据源为核心的理念，来实现整个UI变动更新

用最简单的讲法就是：初始化数据生成了页面，直接修改源数据触发更新，页面重新渲染

关注vue的人都知道，vue3里面使用了proxy替换了defineProperty，

在使用vue2的时候，我们经常会碰到一个问题，添加新的对象属性`obj.a = 1`会无法被vue2劫持，必须使用vue2提供的`$set`方法来进行更新

这个的原因想必大家也都清楚，因为defineProperty只能对当前对象的其中一个属性进行劫持

```javascript
const a = {
    b: 1,
};
Object.defineProperty(a, 'b', {
    set: function() {},
    get: function() {},
});
```

当我们给a对象新增一个属性的时候，当前新增的属性并没有被defineProperty劫持，虽然在对应的对象上依旧成功的生成了一个新的属性，但是我们知道，vue2是通过defineProperty的setter与getter进行数据劫持的，既然新增的数据并没有被劫持，所以无论怎么更新，页面依旧不会重新渲染

而在vue3中，使用proxy来进行数据代理就完全没有这个顾虑了

```javascript
const p = new Proxy({
    a: 1,
    b: 2,
}, {
    get: function(obj, value) {
        console.log('get', obj, value);
        return Reflect.get(obj, value);
    },
    set: function(obj, prop, value) {
        console.log('set', obj, prop, value);
        return Reflect.set(obj, prop, value);
    },
})
```

proxy对于数据的代理，是能够响应新增的属性，当新增一个属性的时候，可以响应到get中，对当前对象进行代理

## vue3是如何通过proxy代理的

首先可以看下vue3新增的几个主要api`ref, reactive, effect，computed`

### ref和reactive

```javascript
const normal = ref(0);
const state = reactive({
    a: 1,
    b: 2,
})
```

vue3中对vue2的兼容处理也是使用了`reactive`，即`instance.data = reactive(data)`，将整个data属性使用`reactive`进行代理

我们知道，vue2中的data就是使用`Object.definePerproty`进行数据劫持的， 那么在`reactive`中，他是如何使用proxy进行数据代理的，来兼容老的书写方式与新的compositionApi

> ps: 由于在reactive里面也只是通过proxy对传入的数据校验和代理，最主要的还是`set`和`get`，所以我们还是直接上垒吧，毕竟心急吃得了热豆腐

#### get

可以分析一下，vue2也好，vue3也罢，针对于数据的获取所做的事情主要内容不会有什么区别

1. 获取当前需要的key的数据
2. 依赖采集

但是，针对于vue3使用proxy的特性，在这边额外做了一部分的兼容

1. 如果获取的数据是一个对象，则会对对象再使用`reactive`进行一次数据的代理
2. 如果是shallow类型的数据代理， 则直接返回当前获取到的数据

##### effect依赖采集

vue除去正常的data的数据代理以外，还有对应的computed和watch，而在vue3中直接使用了effect和computed方法能够直接生成对应的内容

他们的数据更新跟依赖处理都是依赖于当前的data数据上的get进行依赖的收集

掐头去尾的来看最核心的代码

```javascript

// targetMap当前所有代理的数据的一个Map集合
// depsMap当前代理的数据的每一个Key所对应的Map集合
// dep当前代理的数据中的key的对应依赖
// activeEffect当前由effect或者computed生成的数据

let depsMap = targetMap.get(target)
if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
}
let dep = depsMap.get(key)
if (!dep) {
    depsMap.set(key, (dep = new Set()))
}
if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}
```

单纯从这段代码出发去解读的话，可能会有一定的困难，换个角度，从vue3的整体使用情况出发，返回来解读这段代码

```javascript
setup() {
    const b = reactive({
        c: 1,
        b: 2,
    });
    const a = effect(() => {
        return b.c;
    })
}
```

首先，在effect中使用了前面通过reactive定义的b，从表面现象出发的话，我们能知道，当b.c发生变化的时候，a也会同步发生变化

这个变化的原因就是上述源码中的`activeEffect`，当创建的`effect`被调用的时候，会将`activeEffect`设置为自身，并执行相应的回调函数，函数的调用会触发到各自使用到的数据的`getter`，将对应的`effect`依赖注入到每个使用的数据上

至于为什么会设置这么复杂的一个属性的依赖获取，是因为使用`proxy`的原因，`proxy`代理了一整个对象，就不能像vue2使用`Obect.defineProperty`直接在getter里面就当前的字段进行一个依赖绑定，所以在vue3中是直接将整个对象作为一个Map，每个Map的key都是对应的属性，而value则是所有依赖当前属性的对象

#### set

同get，依旧保持着原先的思路跟模式

1. 设置当前数据
2. 发布已订阅的数据（触发依赖更新）

在vue3中，还是有部分区别的，毕竟是单独拉出去的一个库

1. 如果直接调用effect，当检测的数据发生变化的时候会直接修改
2. 如果调用watch或者watchEffect，则会走vue自身的调度方案

所以，如果想当前的数据直接可以更新的话， 可以优先使用effect，他会比watchEffect的更新速度快一点，劣势是可能很多东西得自己写 =，=

至于怎么实现的其实就很简单了

1. 获取当前更新的数据的受依赖项
2. 分组进入等待运行的Set中
3. 执行

但是里面有一个特殊的处理，针对于数组的length属性，这个属性是有一定区别的，接下来具体讲讲在vue3中的数组操作跟vue2的数组操作的内容

#### 数组

在vue2中的，针对数组是多做了一层处理，代理了数组的基本方法，这是因为使用`Object.defineProperty`在数组上面天然存在劣势

具体原因在vue的文档中写的非常清楚了，这里就不详细叙述了

[文档地址](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

而在vue3中使用proxy就完美的解决了这个问题，只是因为proxy能够监听数组的变化，做个测试

```javascript
const a = new Proxy([1,2], {
    get: function(obj, prop) {
        console.log('get', obj, prop);
        return Reflect.get(obj, prop);
    },
    set: function(obj, prop, value) {
        console.log('set', obj, prop, value);
        return Reflect.set(obj, prop, value);
    },
});
a.push(1);

get [1,2] push
get [1,2] length
set [1,2] 2 1
set [1,2, 1] length 3
```

当我们代理了一个数组之后，直接调用push插入一个新的数据，能够明显的看到getter跟setter都会被调用两次，一次是调用的push方法，而另一次是数组的长度length，也就是说，proxy不仅仅会检测到我们当前调用的方法，还能够知道我们的数据长度是否发生了变化

看到这边，可能会有一个疑惑，push是对当前数组进行的操作，但是数组里面还有部分方法是会返回一个新的数组，proxy是否会对新生成的数组也进行代理，这里我们拿splice举个例子

```javascript
// a= [1,2]
a.splice(0, 1)

get [1,2] push
get [1,2] length
get [1,2] constructor
get [1,2] 0
get [1,2] 1
set [1,2] 0 2
set [2,empty] length 1
```

从表现形式来看，proxy代理之后的数组只会对当前数组的内容进行监听，也就是调用`splice`之后新生成的数组的变化是不会被代理的

现在我们回过头来看下vue3的trigger方法，这个是vue在set完成之后触发的依赖更新，同样的掐个头去个尾，除去正常的执行以外，我们看下针对数组做的优化

``` javascript
// add方法是将当前的依赖项添加进一个等待更新的数组中
else if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= (newValue as number)) {
        add(dep)
      }
    })
} 
```

由于我们知道， 在一次操作数组的时候会进行多次的set，那么如果每次set都要去更新依赖的话，会造成性能上的浪费，所以在vue3里面只有在`set length`的时候才会去调用`add`方法，然后统一执行所有的更新

## 结语

不得不说，proxy比defineProperty强大了太多，不仅解决了vue的历史难题，让vue的体验更上了一层，更是去除了不少因为defineProperty而必须要的方法，精简了vue的包大小

虽然proxy的兼容性是比defineProperty低不少，但是在vue里面基本已经抛弃了IE，所以如果你的项目需要在ie下运行的话，那就使用低版本的react的吧，哈哈哈哈哈哈，请放弃vue这个选择

在移动端里面基本上就是没有这种版本的限制，实在是版本低不能使用proxy的话，相信去找找polyfill是能够找到的