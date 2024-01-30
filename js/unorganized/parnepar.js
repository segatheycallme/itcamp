arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// arr = arr.map((element) => element + 1);
arr = arr.map((element) => element + (element % 2 - 0.5) * 2);

console.log(arr);
