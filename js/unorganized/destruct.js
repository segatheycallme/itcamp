// const arr = [1, 2, 3, 4, 5];
// let [prvi, drugi, ...ostali] = arr;
// 
// console.log(prvi, drugi, ostali);

const osoba = {
  ime: "Mervan",
  prezime: "Zejnelovic",
  profesija: {
    naziv: "ucenik",
    skola: "Gimnazija",
  },
  hobiji: ["kosarka", "fudbal", "programiranje"],
}
let { ime, prezime, profesija: { naziv, skola }, hobiji } = osoba;
let [prviHobi, ostaliHobiji] = hobiji;

console.log(naziv, skola, ime, prezime, prviHobi, ostaliHobiji);
