// const arr = [1, 2, 3];
// const iter = arr[Symbol.iterator]();

// console.log(iter.next());
// console.log(iter.next());


// const obj = {
//     '1': 1,
//     '2': 2,
//     '3': 3
// }

// obj.__proto__[Symbol.iterator] = function() {

//     const keys = Object.keys(this);
//     let currentIndex = 0;

//     this.next = () => {

//         if (currentIndex >= keys.length) {
//             return { done: true }
//         } else {
//             return { value: obj[keys[currentIndex++]], done: false }
//         }
        
//     }

//     return this;
// }

// for(let value of obj) {
//     console.log(value)
// }

// const obj = {
//     0: 1,
//     1: 2,
//     5: 3,
//     length: 3,
//     [Symbol.iterator]: Array.prototype[Symbol.iterator]
// }

// for (let v of obj) {
//     console.log(v);
// }

function * generator(x, y) {

    const a = (yield x + y);
    console.log((yield x + y));
    yield 2*x + y;
    return a;
}

const gen = generator(1, 2);

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());