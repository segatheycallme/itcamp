let arr = [12, 32, 32, 321, 213, 3213, 1313131, 313131];

function kalbek(element, index, arr) {
  if (element % 2 || !index) {
    return element
  } else {
    return element - arr[index - 1]
  }
}

let newArr = arr.map(kalbek);

console.log(newArr);
