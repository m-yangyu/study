const arr = [1, 2, 3];
const iter = arr[Symbol.iterator]();

console.log(iter.next());
console.log(iter.next());


const obj = {
    '1': 1,
    '2': 2,
    '3': 3
}

console.log(obj.__proto__.constructor.prototype);

obj.__proto__.prototype[Symbol.iterator] = function() {

    const keys = Object.keys(this);
    let currentIndex = 0;

    const next = () => {

        if (currentIndex >= keys.length) {
            return { done: true }
        } else {
            return { value: obj[keys[currentIndex]], done: false }
        }
        
    }

    return this;
}

for(let value of obj) {
    console.log(value)
}