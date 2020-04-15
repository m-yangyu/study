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

### es6的class 与 es5的function有什么区别



## 闭包

## 作用域

变量存放的生命周期

1. 全局作用域   （最顶层的函数作用域）
2. 函数作用域   （由函数生成的块级作用域）
3. 词法作用域   （）
4. 块级作用域   （由特定语法生成的独立的作用域块）
5. 作用域链     （多层作用域嵌套，以及变量查询的作用域连接）

## 模块化

## 解析

## 事件循环（event loop）

### 异步

### promise

### async/await

### generator

## 事件流

## 原型链

### 继承

## 强制类型转换
