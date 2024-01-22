let punoIme = "sergej-knezevic";
let ime = "";
let prezime = "";
let temp = "";
for (let i = 0; i < punoIme.length; i++) {
  if (punoIme[i] == "-") {
    ime += temp;
    temp = "";
  } else {
    temp += punoIme[i];
  }
}
prezime += temp;

console.log(ime);
console.log(prezime);
