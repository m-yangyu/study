# javascript装逼指南

## this

this是在函数编译过程中生成的，在js中存在两种情况

1. 箭头函数
2. 普通函数

### 箭头函数与普通函数的区别

1. 箭头函数没有this指向
2. 箭头函数无法实例化
3. 箭头函数没有变量提升
4. 箭头函数没有arguments参数（可用...代替）
5. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

### this指向

> 箭头函数

this指向为申明时所在执行上下文的this

暂时我个人想的可能有两种情况，没有具体的查过对应底层实现

1. 因为在箭头函数内部不存在this，所以访问this的时候会根据调用栈去逐步向上查找对应的this，而最近的this的指向是他的父作用域上的this
2. this只是一个单纯的指针，在判断当前新生成的作用域是由箭头函数产生的时候，他的this指向不会改变

> 普通函数

在编译阶段生成的this，指向的是自身编译的时候所在位置的this指向

### apply, call, bind

能够改变this的指向

> 三个方法的区别

1. apply的参数是一个数组，立即执行
2. call的参数是一个个参数，立即执行
3. bind会返回一个新的方法，而不是立即执行，传参与call相同

> 手写apply，call，bind

``` javascript

// apply, call
// bind 的不同只是在于直接返回当前方法而不是调用

Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    let result
    // 处理参数和 call 有区别
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

```

### new

与this相关的还有new这个方法，在js中本质上是没有实例化，继承这么一个概念，是完全依赖于原型链去形成的一个实例化过程

那么，可以考虑下，new既然不是正常的实例化，那么他究竟做了什么事情

1. 生成新的实例
2. 将this指向当前是实例
3. 连接原型

> 代码实现

```javascript

function myNew(fn) {
    const obj = Object.create();
    obj.__proto__ = fn.prototype;
    let result = fn.apply(obj, arguments);
    return result instanceof Object ? result : obj;
}

```

### es6的class 与 es5的function在实例化有什么区别

> class 与 function的区别

1. class 必须实例化才能使用
2. class 中存在static方法，可以使用class名称调用
3. class 的内部函数无法实例化（内部方法没有构造函数）
4. function 存在变量提升，class没有
5. class 实例中的方法挂载在哪个（待考究，方法应该是prototype上，在构造函数中定义在this的方法是在哪得看下）

## 闭包

## 执行上下文

执行上下文是指函数在被使用期间，他的周边环境，即他的作用域，this指向等一些函数所需要的周边环境

### 作用域

变量存放的生命周期

1. 全局作用域   （最顶层的函数作用域）
2. 函数作用域   （由函数生成的块级作用域）
3. 词法作用域   （）
4. 块级作用域   （由特定语法生成的独立的作用域块）
5. 作用域链     （多层作用域嵌套，以及变量查询的作用域连接）

### 调用栈

每一个函数都能生成他自身对应的执行上下文，然后能够通过将执行上下文组成一个栈型结构来进行函数的调用以及作用域间的链式访问的处理

1. 栈是后进先出的特性，所以任何访问到的函数都是最后一个访问的函数先结束在逐步向前，类似于洋葱模型
2. 当前所在调用的方法必定是调用栈的栈顶元素，所以在到栈低元素的那一段路上，所有生成的执行上下文都还存在，也就说明了所有的之前的作用域中的变量都是可访问的
3. 所谓的爆栈指的是，当前的调用栈堆积了太多的执行上下文，也就是有一定数量的函数被调用，导致栈容量不足

## 模块化

### commonjs

node的require跟module.exports方法

### amd

前置依赖，将当前要加载的模块提前写在define函数的最前面，通过异步去加载对应的模块，

define(module, function(module) {

})

require();

### cmd

没有前置依赖，所有的模块都是在define的function中定义，在通过require进行引入额外的依赖

define(function(require, exports, module) {

})

### es module

在es中新生成的export和import内容，比较老的浏览器还是无法兼容这种模块化写法，通过polyfill进行方法的写入

### webpack生成3种模式的区别

### webpack如何生成这3种模块化方案的

### webpack的基础内容有什么

### 如果做到加载文件只引入当前文件的局部内容（tree shaking）

### webpack如何做到代码分割

### webpack3与webpack4的区别是什么

### webpack5新出的内容有什么更新

### plugin与loader的区别是什么

### plugin的生命周期是什么

### 如何编写一个webpack plugin

### webpack的核心内容是啥？tapable是什么？有什么作用

### webpack跟babel的关系是什么

### webpack跟rollup的区别在哪里

### 为什么要使用webpack

### 一个简易的webpack他需要实现什么内容

## 解析

js 是在线解析的，即只有在运行的时候才开始解析js的内容，而不是预先编译完成

### 词法分析

v8会对js进行语法分析，分析当前的字符是属于何种类型的，这时候就会碰到两种情况

1. 加；
2. 不加；

加与不加其实本质来讲没有什么差别，因为js引擎会默认给不加；的进行分段处理

这边个人感觉建议还是加上；因为能够保证所有的段落是完整的，减少解析器自动添加；的一个过程

## 事件循环（event loop）

### 宏任务和微任务

### node里面的事件循环

### setTimeout在浏览器中是如何执行的

### 异步

### promise

### async/await

### generator

## 事件流

## 原型链

### 继承

## 强制类型转换
