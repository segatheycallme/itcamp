const arr = [1, 2, 3213142352, 3, 1, 2, 5, 6, 7, 2];
const obj = {};
arr.forEach(el => {
  if (Object.hasOwn(obj, el)) {
    obj[el]++;
  } else {
    obj[el] = 1;
  }
});

console.log(obj);
