# JS复习指南

## 执行上下文

执行上下文指的是当前运行环境下的一个可访问的变量环境

目前在js中存在的执行上下文包括

- 全局执行上下文
- 函数执行上下文
- eval执行上下文

### 执行栈

由于在js中函数是可访问到父级作用域中的变量， 所以他们的执行上下文是存在向上访问的关系，而形成这种关系的方式用的就是`执行栈（先进后出）`的结构

当一个函数被触发的时候，在编译阶段会生成自己的一个执行上下文，里面包含了当前这个函数自身存在的变量

由于js中存在两种定义变量的方式，并且具有不同的行为，所以环境被区分为`词法环境`和`语法环境`

语法环境存在的变量是用var定义的，那么词法环境就是用const跟let定义的变量

并且在es6之后明确规定， const跟let是有块级作用域的，所以在词法环境中，如果存在块的话，那么他们的变量也是不能被外部访问的，那么词法环境就应该是一个小型的栈，可以从下向上的寻找

### 闭包

一个函数会产生闭包的原因是，当前这个函数中返回了另一个函数，然后在另一个函数中的变量存在引用上一个函数的变量，那么就会形成闭包

闭包的变量存放的位置其实是跟当前函数被定义的时候是相同的，就是在函数被编译的时候，他应该还存在一个特殊的变量环境，就是闭包环境， 那么这个环境是跟随着函数存放的位置一起绑定的， 当执行上下文被推出的时候，闭包环境不会被释放，而当前函数的执行上下文会被释放，直到存在闭包的函数的变量被释放的时候，这个闭包才会被释放

闭包环境依旧是一个栈

## this/call/bind/apply

this是js中的一个比较难以理解的点，一般情况下有几种情况

1. function的this指向调用的对象，如果在window下调用那就是window，在object下调用就是object
2. 箭头函数的this指向在编译时的当前执行上下文的this

call/bind/apply 都是可以直接修改当前方法的this指向

例如：

```js
function test() {
    cosnole.log(this.a);
}

const b = {
    a: 1,
    test,
}

const c = {
    a: 2,
    test,
}

b.a(); // 1
c.a(); // 2
```

### 手动实现call方法

```js
function myCall(context = window, ...args) {
    if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
      }
      const fn = Symbol();
      context[fn] = this;
      const result = context[fn](...args);
      delete context[fn];
      return result;
}
```

### 手动实现bind方法

```js
var $Array = Array;
var ArrayPrototype = $Array.prototype;
var $Object = Object;
var array_push = ArrayPrototype.push;
var array_slice = ArrayPrototype.slice;
var array_join = ArrayPrototype.join;
var array_concat = ArrayPrototype.concat;
var $Function = Function;
var FunctionPrototype = $Function.prototype;
var apply = FunctionPrototype.apply;
var max = Math.max;

var isCallable = function isCallable(value){
    if(typeof value !== 'function'){
        return false;
    }
    return true;
};
var Empty = function Empty() {};
// 源码是 defineProperties
// 源码是bind笔者改成bindFn便于测试
FunctionPrototype.bindFn = function bind(that) {
    var target = this;
    if (!isCallable(target)) {
        throw new TypeError('Function.prototype.bind called on incompatible ' + target);
    }
    var args = array_slice.call(arguments, 1);
    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = apply.call(
                target,
                this,
                array_concat.call(args, array_slice.call(arguments))
            );
            if ($Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return apply.call(
                target,
                that,
                array_concat.call(args, array_slice.call(arguments))
            );
        }
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        array_push.call(boundArgs, '$' + i);
    }
    // 这里是Function构造方式生成形参length $1, $2, $3...
    bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

    if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
};
```

### 手动实现new方法

```js
/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator(ctor){
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    // ES6 new.target 是指向构造函数
    newOperator.target = ctor;
    // 1.创建一个全新的对象，
    // 2.并且执行[[Prototype]]链接
    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    var newObj = Object.create(ctor.prototype);
    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
    // 除去ctor构造函数的其余参数
    var argsArr = [].slice.call(arguments, 1);
    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    var ctorReturnResult = ctor.apply(newObj, argsArr);
    // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj;
}
```