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

## 原型链

js中的所有方法都存在原型， 而所有的对象都有一个指向原型的字段，不断向上回溯就能就形成一条原型链

Function.prototype => 方法原型
new Function().__proto__ => Function.prototype
Function === 方法构造函数（存在于原型之中）

### 原型链的作用

1. 添加统一方法（vue）
2. 继承

#### 添加统一方法

目前主要的已存在的方案就是`Vue`的方案， `Vue`通过挂载在`prototype`上的方法实现所有组件都能够调用统一的方法的能力

`Vue.prototype.$store => vuex`添加到`Vue`构造函数中的参数，在所有`new Vue`的实例里面都能够被访问，并且`this`还指向当前的`Vue`实例

#### 继承

在js中继承其实就是在将原型指向另一个实例，即：

`Function1.prototype = new Function2();`

这样就能够让， `Function1` 继承 `Function2`

具体的实现：

> 借用构造函数

```js
function Father () {
    this.name = 1;
}

function Son() {
    Father.call(this)
}
```

缺点: 父元素的原型链上的方法或者其他内容无法被继承下来

> 组合继承

```js
function Father(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
    alert(this.name);
};
function Son(name,age){
    Father.call(this,name);//继承实例属性，第一次调用Father()
    this.age = age;
}
Son.prototype = new Father();//继承父类方法,第二次调用Father()
Son.prototype.sayAge = function(){
    alert(this.age);
}
```

缺点： 虽然能够继承原型链了， 但是Father的构造函数被执行了两次, 并且在原型链上跟自身都存在了Father的属性

> 寄生组合式继承

```js

function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F(); 
  subClass.prototype.constructor = subClass;

  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

function Father(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
    alert(this.name);
};
function Son(name,age){
    Father.call(this,name);//继承实例属性，第一次调用Father()
    this.age = age;
}
extend(Son,Father)//继承父类方法,此处并不会第二次调用Father()
Son.prototype.sayAge = function(){
    alert(this.age);
}
```

#### es6的class继承跟es5的有什么区别

1. class 申明会提升
2. class 内部使用了严格模式
3. class 的所有方法（包括实例跟静态）都是不可枚举的
4. class 的方法都是没有`prototype`的，所以无法使用`new`关键字来实例化
5. class 必须使用`new`关键字，不然无法创建出实例
6. class 内部无法重新类名
7. es6与es5的调用this方式不一样，es5是先实例化子类然后在子类上添加相关的父类的信息，而es6是先实例父类，然后在父类上添加子类的实例信息，这样的差别导致es6的继承可以继承一些内置对象，例如Date，Array


## promise

promise是js的异步回调的一个处理方案， 当然后面的async / await， 跟generator更加的舒适

### 手写promise

```js
// 首先知道promise是有三种状态的， pending，fulfilled和rejected
// 其次需要了解promise的then跟catch是可以链式调用的

const PROMISE_STATE = {
    PENDING: 'pengding',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class Promise {
    constructor(executor) {
        this.state = PROMISE_STATE.PENDING;
        this.successCallback = [];
        this.failCallback = [];
        this.value = void 0;

        try {
            excutor(this.resolve, this.reject);
        } catch(e) {
            this.reject(e);
        }
        // 支持链式调用
        return this;
    }

    // 如果resolve的值是一个Promise， 那么需要取出Promise的值
    handlePromise(value) {
        if (value instanceof Promise) {
            return value.value;
        }
        return value;
    }

    resolve(value) {
        // 放入微任务队列
        queueMicrotask(() => {
            if (this.state === PROMISE_STATE.PENDING) {
                this.state = PROMISE_STATE.FULFILLED;
                this.value = value;
                const callback = this.successCallback.pop();
                try {
                    value = callback(this.handlePromise(value))
                    if (this.successCallback.length) {
                        // 由于两个then之间是可以被插入微任务的，所以肯定是当前微任务生成下一个微任务
                        this.resolve(value);
                    }
                } catch(e) {
                    this.reject(e);
                }
            }
        })
    }

    reject(e) {
        queueMicrotask(() => {
            if (this.failCallback.length) {
                this.state = PROMISE_STATE.REJECTED;
                // 连续两个catch是防止在catch里面报错
                try {
                    const callback = this.failCallback.pop();
                    callback(e);
                } catch(e) {
                    this.reject(e);
                }
            }
        })
    }

    then(callback) {
        this.successCallback.push(callback);
        return this;
    }

    catch(callback) {
        this.failCallback.push(callback);
        return this;
    }

    static all() {
        // 懒得写了， 就是执行里面的promise，取出所有的值，返回一个promise
    }

    static race() {
        // 懒得写了， 就是第一个resolve的promise作为结果直接返回
    }
}
```

## 深浅拷贝

浅拷贝指的是，拷贝的对象的地址
深拷贝指的是，将整个对象全部重新复制一份，相当于在内存里面存入了两个一模一样的对象

### 手写深拷贝

```js

const map = new WeakMap();

var deepCopy = function(obj) {
    if (map.has(obj)) {
        return map.get(obj);
    }
    if (typeof obj !== 'object') return;

    var target = obj instanceof Array ? [] : {};
    map.set(obj, target);

    Reflect.ownKeys(obj).forEach((key) => {
        target[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    })
    return target;
}
```

上面的做法可能会出现递归爆站的情况， 这时候就直接使用广度优先的方法直接一路循环下来就好了