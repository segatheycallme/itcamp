function validate(str, minLen, maxLen, numberYesOrNo) {
  if (numberYesOrNo) {
    return isNaN(Number(str)) || !str;
  } else {
    return (str.length < minLen || str.length > maxLen);
  }
}

const osoba = {
  ime: "",
  prezime: "",
  godine: NaN,
  hobi: [],
  lokacija: {
    grad: "",
    drzava: "",
  }
}

osoba.ime = prompt("Unesite vase ime: ");
while (validate(osoba.ime, 1, 50, false)) {
  osoba.ime = prompt("Niste uneli validno ime. Unesite vase ime: ");
}
osoba.prezime = prompt("Unesite vase prezime: ");
while (validate(osoba.prezime, 1, 50, false)) {
  osoba.prezime = prompt("Niste uneli validno prezime. Unesite vase prezime: ");
}
osoba.godine = Number(prompt("Koliko imate godina: "));
while (validate(osoba.godine, 1, 50, true)) {
  osoba.godine = Number(prompt("Niste uneli validan broj godina. Koliko imate godina: "));
}
console.log(osoba);
