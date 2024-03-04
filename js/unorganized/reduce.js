const knjige = [
  { ime: "romeo i julia", brojStr: 100, tip: "roman" },
  { ime: "pakao", brojStr: 200, tip: "odlomak drame" },
  { ime: "hari poter 1", brojStr: 300, tip: "roman" },
  { ime: "hari poter 2", brojStr: 300, tip: "roman" },
  { ime: "hari poter 3", brojStr: 300, tip: "roman" },
  { ime: "hari poter 4", brojStr: 300, tip: "roman" },
  { ime: "hari poter 5", brojStr: 300, tip: "roman" },
  { ime: "hari poter 6", brojStr: 300, tip: "roman" },
]

let mmm = knjige.reduce((accumulator, tren) => accumulator + tren.brojStr * (tren.tip == "roman"), 0);
console.log(mmm);
