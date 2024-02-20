class Zmaj {
  constructor(glave, krila, boja, ime) {
    this.glave = glave;
    this.krila = krila;
    this.boja = boja;
    this.ime = ime;
  }
  printInfo() {
    console.log("Broj glava: " + this.glave);
    console.log("Broj krila: " + this.krila);
    console.log("Boja:", this.boja);
    console.log("Ime:", this.ime);
  }
}

const mojZmaj = new Zmaj(7, 0, "crna", "Hydra");
mojZmaj.printInfo();

class Osoba {
  constructor(ime, prezime, godiste, mesec, dan) {
    this.ime = ime;
    this.prezime = prezime;
    this.rodj = new Date;
    this.rodj.setDate(dan);
    this.rodj.setMonth(mesec - 1);
    this.rodj.setFullYear(godiste);
  }
  brojGodina() {
    return Math.floor(((new Date).getTime() - this.rodj.getTime()) / (1000 * 3600 * 24 * 365));
  }
}

const mervan = new Osoba("Sergej", "Knezevic", 2008, 4, 21);
console.log(mervan.brojGodina());
