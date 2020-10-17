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
    get: function(obj, prop, value) {
        console.log('get', obj, prop, value);
        return Reflect.get(obj, prop, value);
    },
    set: function(obj, value) {
        console.log('set', obj, value);
        return Reflect.set(obj, value);
    },
})
```

proxy对于数据的代理，是能够响应新增的属性，当新增一个属性的时候，可以响应到get中，对当前对象进行代理

## vue2和vue3的区别

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

