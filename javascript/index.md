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

entry: 入口，可以添加入口文件信息，单页或者多页，就是配置不同的入口文件
output: 出口文件，根据入口生成不同的出口内容，以及输出方式，amd，cmd等等，chunkname也是在这边进行配置，使用contenthash能够有效的对文件的缓存进行控制
module: 针对文件的解析方式，比如将vue文件解析成不同内容的文件，loader的所在
plugin: 使用插件的地方
optimization: webpack4新增的一个属性，内置的优化外放

### 如果做到加载文件只引入当前文件的局部内容（tree shaking）

### webpack如何做到代码分割

### webpack3与webpack4的区别是什么

### webpack5新出的内容有什么更新

### plugin与loader的区别是什么

> loader

loader是提供文件解析的插件，能够针对文件进行编译，例如将ts文件编译成js文件

> plugin

plugin是在loader进行解析的各个关键步骤中添加一些额外的内容

### plugin的生命周期是什么

1. environment
2. afterEnvironment
3. initialize
4. beforeRun
5. run
6. beforeCompiler
7. compile
8. thisCompilation
9. compilatiion
10. make
11. afterCompiler
12. emit
13. afterEmit
14. done
15. afterDone

### 如何编写一个webpack plugin

1. 使用class返回一个apply的内部方法
2. 使用function，this上挂载一个apply方法

根据不同的生命周期，使用tapable提供的钩子函数，添加对应的钩子方法

compiler的生命周期中，会将当前编译的对象compiltion返回给钩子函数，在钩子内部添加对应的模块内容，实现plugin的扩展

### webpack的核心内容是啥？tapable是什么？有什么作用

遵循流程化的构建，将编译过程分解成不同的任务级别，然后生成对应的生命周期，提供在不同阶段生命周期的调用

tapable是提供生命周期你钩子以及钩子管理的工具

### webpack跟babel的关系是什么

webpack是文件统一编译的工具，babel是将js进行降级或者说将新版本的js转换为低版本浏览器可运行的代码

webpack提供一个入口，给babel去解析各种文件内容

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
