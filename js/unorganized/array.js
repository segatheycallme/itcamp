let arr = [1, 2, 3, 4, 5];

let sum = 0;
let count = 0;
while (count < arr.length) {
  if (!(arr[count] % 2)) {
    sum += arr[count];
  }
  count++;
}

console.log(sum);
