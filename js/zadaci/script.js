class Zadatak {
  constructor(id, opis) {
    this.id = id;
    this.opis = opis;
  }
  static unosZadatka() {
    const opis = prompt("Unesite opis zadatka.");
    let id = opis.length + Date.now();
    id = id.toString(16);
    return new Zadatak(id, opis);
  }
  ispisPodataka() {
    return "id: " + this.id + " opis: " + this.opis;
  }
  izmena() {
    this.opis = prompt("Stari opis: " + this.opis + "\nUnesite novi opis zadatka.")
  }
}

let temp = JSON.parse(localStorage.getItem("zadaci"));
let zadaci = [];
temp.forEach(el => {
  zadaci.push(new Zadatak(el["id"], el["opis"]));
});
let str = "";
let izbor = prompt("Napisite \n\
    1 za pravljenje novog zadatka \n\
    2 za pregled postojecih zadataka \n\
    3 za izmenu postojecih zadataka \n\
    4 za brisanje postojecih zadataka \n\
    0 ili cancel za izlazak");

while (izbor && Number(izbor)) {
  switch (izbor) {
    case '1':
      zadaci.push(Zadatak.unosZadatka());
      break;

    case '2':
      str = "";
      zadaci.forEach((el, i) => {
        str += i + 1;
        str += ". "
        str += el.ispisPodataka();
        str += '\n'
      });
      alert(str);
      break;

    case '3':
      str = "";
      zadaci.forEach((el, i) => {
        str += i + 1;
        str += ". "
        str += el.ispisPodataka();
        str += '\n'
      });
      izbor = prompt("Od sledecih zadataka izaberite jedan prema indeksu.\n" + str);
      zadaci[izbor - 1].izmena();
      break;

    case '4':
      str = "";
      zadaci.forEach((el, i) => {
        str += i + 1;
        str += ". "
        str += el.ispisPodataka();
        str += '\n'
      });
      izbor = prompt("Od sledecih zadataka izaberite jedan prema indeksu.\n" + str);
      zadaci.splice(izbor - 1, 1);
      break;
  }
  izbor = prompt("Napisite \n\
    1 za pravljenje novog zadatka \n\
    2 za pregled postojecih zadataka \n\
    3 za izmenu postojecih zadataka \n\
    4 za brisanje postojecih zadataka \n\
    0 ili cancel za izlazak");
}

localStorage.setItem("zadaci", JSON.stringify(zadaci));
