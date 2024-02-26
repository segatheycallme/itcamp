class Mmm {
  constructor(ime) {
    this.naziv = ime;
  }
  static plusic(a, b) {
    return a + b;
  }
}

// console.log(Mmm.plusic(1, 2));
// let abc = new Mmm("ja");
// console.log(abc.naziv);

class Account {
  constructor() {
    this.username = prompt("Unesite username");
    this.password = prompt("Unesite sifru");
    this.email = prompt("Unesite email");
    this.years = prompt("Unesite broj godina");
  }
  displayData() {
    console.log("username: " + this.username);
    console.log("sifra: " + this.password);
    console.log("username: " + this.email);
    console.log("broj godina: " + this.years);
  }
}

let database = [];

database.push(new Account());
database.push(new Account());
database.push(new Account());

while (prompt("Unesite 1 ako hocete da pravite jos accountova, 2 ako zelite da stanete") - 2) {
  database.push(new Account());
}

let index = prompt("Unesite broj accounta koji zelite da ispisite (od 1 do " + database.length + ")");
database[index - 1].displayData();
