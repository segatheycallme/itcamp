const mervan = {
  ime: "mervan",
  prezime: "zejnelovic",
  sport: "fudbal",
}

// Object.entries(mervan).forEach(([key, value]) => {
//  console.log(key, value);
// });

class Osoba {
  constructor(ime, prezime, godine) {
    this.ime = ime;
    this.prezime = prezime;
    this.godine = godine;
  }
  basicInfo() {
    console.log(this.ime, this.prezime, this.godine);
  }
}

class Ucenik extends Osoba {
  constructor(ime, prezime, godine, skola) {
    super(ime, prezime, godine);
    this.skola = skola;
  }
  advancedInfo() {
    console.log(this.ime, this.prezime, this.godine, this.skola);
  }
  ocena() {
    const grade = Math.floor((Math.random() - 1e-10) * 5 + 1);
    console.log(grade);
  }
}
const ja = new Ucenik("ja", "moje prezime", 53, "Gimn");

// ja.basicInfo();
// ja.advancedInfo();

class Zivotinja {
  constructor(ime, godine, boja) {
    this.ime = ime;
    this.godine = godine;
    this.boja = boja;
  }
  proizvediZvuk() {
    console.log(this.zvuk);
  }
}

class Macka extends Zivotinja {
  constructor(ime, godine, boja) {
    super(ime, godine, boja);
    this.zvuk = "Mjau";
  }
}
class Pas extends Zivotinja {
  constructor(ime, godine, boja) {
    super(ime, godine, boja);
    this.zvuk = "Av av";
  }
}

const cicko = new Macka("Cicko", 1.5, "Siva");
const cici = new Pas("Cici", 2, "Crn");

cicko.proizvediZvuk();
cici.proizvediZvuk();
