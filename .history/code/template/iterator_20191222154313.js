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

    const a = yield x + y;
    yield 2*x + a;
    return a;
}

const gen = generator(1, 2);

let a = gen.next();

console.log(gen.next(a.value));
console.log(gen.next());

// function * generator(x, y) {
//     yield x + y;
//     yield 2*x + y;
// }

// const gen = generator(1, 2);

// console.log(gen === gen[Symbol.iterator]()) // true

// for(let v of gen) {
//     console.log(v);
// }