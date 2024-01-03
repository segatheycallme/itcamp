let broj = prompt("unesite neki broj");

if (broj % 15 == 0) {
  console.log("fizzbuzz");
} else if (broj % 3 == 0) {
  console.log("fizz");
} else if (broj % 5 == 0) {
  console.log("buzz");
} else {
  console.log(broj);
}
