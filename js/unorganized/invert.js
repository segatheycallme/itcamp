function invert(str) {
  let ans = "";
  for (let i = 0; i < str.length; i++) {
    const el = str[i];
    ans += el.match('[a-z]') ? el.toUpperCase() : el.toLowerCase();
  }
  return ans;
}

let str = "The Quick Brown Fox";
console.log(invert(str))
