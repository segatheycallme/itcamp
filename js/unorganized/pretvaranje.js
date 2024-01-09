// napraviti func koji prima string 
// ona pokusava da ga pretvori u Number i vraca ga kao Number
const num = "";
function func(broj) {
  if (broj === "") {
    return broj + " nisam mogao da se konvertujem";
  }
  if (isNaN(Number(broj))) {
    return broj + " nisam mogao da se konvertujem";
  } else {
    return Number(broj);
  }
}

console.log(func(num));
