class Factory {
    constructor(name) {
        this.name = name;
    }

    getName(){
        return this.name;
    }

}

const a = new Factory('123');

console.log(a.getName());