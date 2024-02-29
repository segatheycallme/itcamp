if (!localStorage.getItem("broj poseta")) {
  let username = prompt("unesite username");
  let sifra = prompt("unesite sifru");
  username = sifra;
  localStorage.setItem("broj poseta", 0)
} else {
  localStorage.setItem("broj poseta", Number(localStorage.getItem("broj poseta")) + 1);
}
