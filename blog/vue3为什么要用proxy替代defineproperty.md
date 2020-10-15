# vue3为什么要用proxy替代defineProperty

关注vue的人都知道，在vue3里面使用了proxy替换了defineProperty，进行了整体上的优化

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

## vue2和vue3

首先，可以看下，vue3新增的几个主要api`ref, reactive, effect，computed`

### ref和reactive

先来看下他在vue3中是如何使用的

```javascript
const normal = ref(0);
const state = reactive({
    a: 1,
    b: 2,
})
```

vue3中也有对vue2的兼容处理也是使用了`reactive`，即`instance.data = reactive(data)`，将整个data属性使用`reactive`进行代理

我们知道，vue2中的data就是使用`Object.definePerproty`进行数据劫持的， 那么在`reactive`中，他是如何使用proxy进行数据代理的，来兼容老的书写方式与新的compositionApi

由于在reactive里面也只是通过proxy对传入的数据校验和代理，所以我们还是直接上垒，毕竟心急吃得了热豆腐

来看下proxy的get和set具体做了什么

```javascript
// 

```