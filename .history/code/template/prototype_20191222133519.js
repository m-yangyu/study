// 原型链继承
    // 方法1
    function superFunc() {
        this.test = '123';
    }
    // 方法1上的prototype添加getValue方法
    superFunc.prototype.getValue = function () {
        return this.test;
    }
    // 方法2
    function subFunc() {
        this.subTest = '555';
    }
    // 实例化方法1
    const superType = new superFunc();
    // 将方法2的prototype指向方法1的实例
    subFunc.prototype = superType;
    // 实例化方法2
    const interface = new subFunc();
    // 方法2继承了方法1的内容
    console.log(interface.getValue());
    console.log(interface.subTest);