const osoba = {
  ime: "",
  prezime: "",
  godine: "a"
};

while (!osoba.ime) {
  osoba.ime = prompt("Unesite svoje ime: ");
}
while (!osoba.prezime) {
  osoba.prezime = prompt("Unesite svoje prezime: ");
}
while (isNaN(Number(osoba.godine)) || !osoba.godine) {
  osoba.godine = prompt("Unesite svoj broj godina: ");
}

console.log(osoba)
