function validate(str, minLen, maxLen) {
  return (str.length < minLen || str.length > maxLen);
}

function validateEmail(str) {
  const regex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$");
  return !regex.test(str);
}

const osoba = {
  username: "",
  email: "",
  sifra: "",
}

osoba.username = prompt("Unesite vas username:");
while (validate(osoba.username, 1, 32)) {
  osoba.username = prompt("Unet username nije validan. Unesite vas username:");
}

osoba.email = prompt("Unesite vas email:");
while (validateEmail(osoba.email)) {
  osoba.email = prompt("Unet email nije validan. Unesite vas email:");
}

osoba.sifra = prompt("Unesite vasu sifru:");
while (validate(osoba.sifra, 8, 20)) {
  osoba.sifra = prompt("Uneta sifra nije validna. Unesite vasu sifru:");
}

console.log(osoba)
