class Factory {
    constructor(name) {
        this.name = name;
    
        switch(name) {
            case 'apple':
                break;
            default: 
                break;
        }
    }

    getName(){
        return this.name;
    }

}

const a = new Factory('123');

console.log(a.getName());