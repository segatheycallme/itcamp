let kemal = 150;
const staKupujes = prompt("unesi ono sto zelis kupiti");

const sok = 60;
const cokolada = 40;
const cigare = 460;

switch (staKupujes.toLowerCase()) {
  case "sok":
    if (kemal >= sok) {
      console.log("🍹🍹🍹🍹🍹🍹🍹🍹🍹");
      kemal -= sok;
      console.log("na racunu sada imas: ", kemal);
    } else {
      console.log("nemas dovoljno para za sok");
      console.log("na racunu imas: ", kemal);
    }
    break;

  case "cokolada":
    if (kemal >= cokolada) {
      console.log("🍫🍫🍫🍫🍫🍫🍫🍫🍫");
      kemal -= cokolada;
      console.log("na racunu sada imas: ", kemal);
    } else {
      console.log("nemas dovoljno para za cokoladu");
      console.log("na racunu imas: ", kemal);
    }
    break;

  case "cigare":
    if (kemal >= cigare) {
      console.log("🚬🚬🚬🚬🚬🚬🚬🚬🚬");
      kemal -= cigare;
      console.log("na racunu sada imas: ", kemal);
    } else {
      console.log("nemas dovoljno para za cigare");
      console.log("na racunu imas: ", kemal);
    }
    break;

  default:
    console.log("ne mozes kupiti to")
    break;
}
