let broj = prompt("unesite neki broj");

if (isNaN(broj)) {
  console.log(`${broj} nije broj`)
} else if (broj % 2) {
  console.log(`${broj} nije paran`)
} else {
  console.log(`${broj} je paran`)
}
