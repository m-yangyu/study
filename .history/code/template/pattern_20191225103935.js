class PhoneFactory {
    constructor(name) {
        this.name = name;
    }

    getName(){
        return this.name;
    }

    createdProduct() {
        switch(this.name) {
            case 'apple':
                console.log('apple Factory');
                break;
            case 'huawei':
                console.log('huawei Factory');
                break;
            case 'xiaomi':
                console.log('xiaomi Factory');
                break;
            default: 
                throw new Error('厂家错误');
        }
    }

}

const a = new Factory('123');

console.log(a.getName());