const ucenik = {
  ime: "Nadija",
  prezime: "Jukovic",
  starost: 15,
  punoletnost: false,
  imeIPrezime: function() {
    return this.ime + " " + this.prezime;
  }
}

console.log(ucenik.imeIPrezime());

const myCar = {
  id: 1,
  marka: "Audi",
  model: "a4",
  boja: "Crvena",
  pogon: "prednji",
  menjac: "automatski",
  kontakt: ["0622222", "02033322"],
  servis: {
    datum: "04,maj",
    km: 23000,
    serviser: "Pasovic",
  },
  udaran: true,
  trenutnaBrzina: 0,
  maksimalnaBrzina: 260,
  povecanjeBrzine: function(deltaBrzina) {
    this.trenutnaBrzina = Math.min(this.maksimalnaBrzina, this.trenutnaBrzina + deltaBrzina);
  },
  smanjenjeBrzine: function(deltaBrzina) {
    this.trenutnaBrzina = Math.max(0, this.trenutnaBrzina - deltaBrzina);
  },
  koci: function() {
    this.trenutnaBrzina = 0;
  }
};

console.log(myCar.trenutnaBrzina);
myCar.povecanjeBrzine(250);
console.log(myCar.trenutnaBrzina);
myCar.povecanjeBrzine(20);
console.log(myCar.trenutnaBrzina);
