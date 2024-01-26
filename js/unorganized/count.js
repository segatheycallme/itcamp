const arr = [1, 2, 3, 4, 5, 6, 1, 2, 1, 1, 2, 25, 6, 3, 7, 4, 4]
const findMe = 1;
let count = 0;

arr.forEach((el) => { if (el == findMe) { count++; } });

console.log(count);
