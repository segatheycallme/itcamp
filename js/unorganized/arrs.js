const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr2 = [2, 2, 3, 1, 5, 6, 7, 21, 5, 76, 8, 9];
const temp = [];
for (let i = 0; i < arr1.length; i++) {
  const element = arr1[i];
  if (!temp.includes(element)) {
    temp.push(element);
  }
}
for (let i = 0; i < arr2.length; i++) {
  const element = arr2[i];
  if (!temp.includes(element)) {
    temp.push(element);
  }
}

console.log(temp);
