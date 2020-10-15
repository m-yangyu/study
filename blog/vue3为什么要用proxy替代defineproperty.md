# vue3为什么要用proxy替代defineProperty

在这之前，我们得先了解下vue的核心理念`mutable`

不管是vue2还是vue3，在实现的过程中，核心概念一直保持稳定，以可变数据源为核心的理念，来实现整个UI变动更新

用最简单的讲法就是：初始化数据生成了页面，直接修改源数据触发更新，页面重新渲染

关注vue的人都知道，vue3里面使用了proxy替换了defineProperty，

在使用vue2的时候，我们经常会碰到一个问题，添加新的对象属性`obj.a = 1`会无法被vue2劫持，必须使用vue2提供的`$set`方法来进行更新

这个的原因想必大家也都清楚，因为defineProperty使用的前提必须是已知属性

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

#### 订阅/发布

#### 数据采集

#### 响应更新

#### 对象

#### 数组

