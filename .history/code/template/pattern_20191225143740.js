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


let a = new Proxy({}, {
            get(target, name) {
                console.log(target, name);
                return target[name];
            }
        })
