let arrObj = [{ ime: "ime" }, { ime: "ime2" }];
arrObj.forEach(el => {
  el["prezime"] = "prezime";
})

console.log(arrObj);

const objj = {
  ime: "seg",
  prezime: "kne",
  godine: 233,
  lokacija: "pazar",
}
const keyz = Object.keys(objj);
const vrednosti = Object.values(objj);


console.log(keyz);
console.log(vrednosti);
