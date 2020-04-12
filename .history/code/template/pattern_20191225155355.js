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


function singleCase(name) {
    this.name = name
}

function createdCase(name) {
    const single = '';
    return function() {
        console.log(123);
        return !single ? single : single = new singleCase(name)
    }()
}

const a = new createdCase('123');
const b = new createdCase('111');

console.log(a);