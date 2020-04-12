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


class PhoneFactory {
    constructor(name) {
        this.name = name;
    }

    getName(){
        return this.name;
    }

    createdProduct() {
        
    }

}

class huaweiPhoneFactory extends PhoneFactory{
    constructor(name) {
        super(name)
    }

    createdProduct() {
        console.log('huawei Factory');
    }
}

const phone = new huaweiPhoneFactory();

phone.createdProduct();