const arr = [1, 2, 3];
const iter = arr[Symbol.iterator]();

iter.next();

console.log(iter);