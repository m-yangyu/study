// class PhoneFactory {
//     constructor(name) {
//         this.name = name;
//     }

//     getName(){
//         return this.name;
//     }

//     createdProduct() {
//         switch(this.name) {
//             case 'apple':
//                 console.log('apple Factory');
//                 break;
//             case 'huawei':
//                 console.log('huawei Factory');
//                 break;
//             case 'xiaomi':
//                 console.log('xiaomi Factory');
//                 break;
//             default: 
//                 throw new Error('厂家错误');
//         }
//     }

// }

// const a = new PhoneFactory('apple');

// console.log(a.createdProduct());


// class PhoneFactory {
//     constructor(name) {
//         this.name = name;
//     }

//     getName(){
//         return this.name;
//     }

//     createdProduct() {
//         throw new Error('不能使用抽象方法');
//     }

// }

// class huaweiPhoneFactory extends PhoneFactory{
//     constructor(name) {
//         super(name)
//     }

//     createdProduct() {
//         console.log('huawei Factory');
//     }
// }

// const phone = new huaweiPhoneFactory();

// phone.createdProduct();

// let a = {}
// let currentVal = '';
// Object.defineProperty(a, 'b', {
//     get(){
//         return currentVal;
//     },
//     set(val) {
//         currentVal = val;
//     },
//     enumerable : true,
//     configurable : true
// })


// let a = new Proxy({}, {
//             get(target, name) {
//                 console.log(target, name);
//                 return target[name];
//             },
//             set(target, name, val) {
//                 console.log(target, name, val);
//                 target[name] = val;
//             }
//         })


// class Dep {
//     constructor(name, publish = void 0) {
//         this.name = name;
//         this.publish = publish;
//         this.child = [];
//     }

//     setPublish(publish) {
//         thiis.publish = publish
//     }

//     add(dep) {
//         this.child.push(dep);
//         return this;
//     }

//     del(dep) {
//         this.child = this.child.filter(item => item.name === dep.name);
//     }

//     done() {
//         this.child.map(item => {
//             item.publish();
//         })
//     }
// }

// function getName() {
//     console.log(`${this.name} is publish`);
// }

// const dep = new Dep('dep', getName);
// const dep1 = new Dep('dep1', getName);
// const dep2 = new Dep('dep2', getName);
// const dep3 = new Dep('dep3', getName);

// dep.add(dep1).add(dep2).add(dep3);

// dep.done();


// const createdCase = function () {
//     let single = '';
    
//     function singleCase(name) {
//         this.name = name
//     }

//     return function(name) {
//         return single ? single : single = new singleCase(name)
//     }
// }();

// const a = new createdCase('123');
// const b = new createdCase('111');

// console.log(a.name === b.name);

// 策略模式
// const phoneFactory = {
//     apply() {
//         console.log('apply factory');
//     },
//     huawei() {
//         console.log('huawei factory');
//     },
//     vivoo() {
//         console.log('vivo factory');
//     }
// }

// function phone() {
//     this.func = () => {};
//     this.add = function(func) {
//         this.func = func;
//     }
//     this.start = function() {
//         this.func();
//     }
// }

// const a = new phone();
// a.add(phoneFactory.apply);
// a.start();

// 策略模式 form校验

// const rules = {
//     maxLength(value, length, errmsg) {
//         if (value.length > length) {
//             return errmsg
//         }
//     },
//     minLength(value, length, errmsg) {
//         if (value.length < length) {
//             return errmsg
//         }
//     },
//     isPhone(value, errmsg) {
//         if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
//             return errmsg
//         }
//     }
// }

// class FormValid{
//     constructor() {
//         this.rules = [];
//         this.data = {};
//     }
//     setRule(key, name, errmsg) {
//         if (!key || !name || !errmsg) {
//             console.error('方法参数不正常');
//             return ;
//         }
//         this.rules.push(function(value) {
//             const nameArr = name.split(':');
//             const paramsArr = [];
//             paramsArr.push(this.data[key]);
//             !!nameArr[1] && paramsArr.push(nameArr[1]);
//             paramsArr.push(errmsg);
//             return rules[nameArr[0]].apply(this, paramsArr);
//         });
//     }
//     setData(data) {
//         this.data = data;
//     }
//     valid() {
//         if (Object.keys(this.data).length === 0) {
//             console.error('当前校验器中没有数据');
//             return ;
//         }
        
//         let errmsg = [];
//         this.rules.map(func => {
//             const currentErrmsg = func.call(this);
//             !!currentErrmsg && errmsg.push(currentErrmsg);
//         });

//         return {
//             isValid: errmsg.length === 0,
//             errmsg
//         }

//     }
// }

// function getValid() {
//     const validator = new FormValid();
//     validator.setRule('a', 'maxLength:6', 'a最大长度为6');
//     validator.setRule('b', 'minLength:2', 'b最小长度为2');
//     validator.setRule('c', 'isPhone', 'c不是手机类型');
//     validator.setData({
//         a: '123123123',
//         b: '1',
//         c: '11706844637'
//     })
//     console.log(validator.valid());
// }

// getValid();

// 代理模式

// function add() {
//     const arr = Array.from(arguments);
//     let num = 0;
//     arr.map(item => num += item);
//     console.log(num);
//     return num;
// }

// class proxyCache {
//     constructor(func) {
//         this.func = func;
//         this.cache = {};
//     }

//     done() {
//         const arr = Array.from(arguments);
//         const name = arr.toString();
//         if (this.cache[name]) {
//             return this.cache[name]
//         }
//         this.cache[name] = this.func.apply(this, arr);
//         return this.cache[name];
//     }

// }

// const addCache = new proxyCache(add);

// console.log(addCache.done(1,2,3,4,5));
// console.log(addCache.done(1,2,3,4,5));


// 命令模式

const btn = document.getElementById('btn');
const revoke = document.getElementById('revoke');
const input = document.getElementById('input');

function test(value) {
    console.log('test execute');
}

class Command{
    constructor() {
        this.cache = [];
    }
    execute(value) {
        test(value);
        this.cache.push(test.bind(this, value));
    }
    reStart() {
        this.cache.map(func => func());
    }
}



btn.addEventListener('click', () => command.execute(input.value));