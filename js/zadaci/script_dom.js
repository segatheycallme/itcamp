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

let tata = document.getElementsByTagName("ol")[0];
let temp = JSON.parse(localStorage.getItem("zadaci"));
let zadaci = [];
temp.forEach(el => {
  zadaci.push(new Zadatak(el["id"], el["opis"]));
});

let str = "";
zadaci.forEach((el, i) => {
  str = "";
  str += el.ispisPodataka();
  str += '\n'
  tata.appendChild(document.createElement("li"));
  document.getElementsByTagName("li")[i].innerHTML = str;
});

function izbor() {
  let izbor = prompt("Napisite \n\
    1 za pravljenje novog zadatka \n\
    2 za izmenu postojecih zadataka \n\
    3 za brisanje postojecih zadataka \n\
    0 ili cancel za izlazak");
  switch (izbor) {
    case '1':
      zadaci.push(Zadatak.unosZadatka());
      str = "";
      str += zadaci[zadaci.length - 1].ispisPodataka();
      str += '\n'
      tata.appendChild(document.createElement("li"));
      document.getElementsByTagName("li")[zadaci.length - 1].innerHTML = str;
      break;

    case '2':
      izbor = prompt("Od sledecih zadataka izaberite jedan prema indeksu.");
      zadaci[izbor - 1].izmena();
      tata.getElementsByTagName("li")[izbor - 1].innerHTML = "id: " + zadaci[izbor - 1].id + " opis: " + zadaci[izbor - 1].opis;
      break;

    case '3':
      izbor = prompt("Od sledecih zadataka izaberite jedan prema indeksu.");
      zadaci.splice(izbor - 1, 1);
      tata.removeChild(tata.getElementsByTagName("li")[izbor - 1])
      break;
  }
  localStorage.setItem("zadaci", JSON.stringify(zadaci));
}
