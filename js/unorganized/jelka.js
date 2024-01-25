let n = 11;
// for (let i = 1; i <= n; i++) {
//   console.log("*".repeat(i));
// }

// let zvezdice = ""
// for (let i = 1; i <= n; i++) {
//   zvezdice += "*";
//   console.log(zvezdice);
// }

for (let i = 1; i <= n; i += 2) {
  console.log(" ".repeat((n - i) / 2) + "*".repeat(i) + " ".repeat((n - i) / 2));
}
for (let i = 1; i <= n; i += 2) {
  console.log(" ".repeat((n - 1) / 2) + "*" + " ".repeat((n - 1) / 2));
}
