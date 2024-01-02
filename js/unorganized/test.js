// domaci jeste da korisnika pitate koliko zeli novca da ima
// napraviti takodje store gde mozete kupiti odredjenje artikle
// ako korisnik uneste neki od ponudjenih onda se provera da li korisnik ima novca dovljno za to ako nema pitamo korisnika
// da li zeli da se uzajmi i vi korisniku pozajmite onoliko koliko on unese

let novac = prompt("unesite koliko imate novca");
const stolica = 1200;
const sto = 3200;
const tv = 12000;

let izbor = prompt("zelite li kupiti stolicu, sto ili tv");
switch (izbor.toLowerCase()) {
  case "stolica":
    novac -= stolica;
    if (novac >= 0) {
      console.log("kupili ste stolicu, trenutno stanje ", novac);
    } else {
      izbor = prompt("nemate dovoljno para. hocete li da uzmete kredit?(da ili ne)");
      if (izbor == "da") {
        let dug = -1 * novac;
        console.log("dug vam je ", dug);
      } else {
        novac += stolica;
        console.log("nista niste kupili.")
      }
    }
    break;
  case "sto":
    novac -= sto;
    if (novac >= 0) {
      console.log("kupili ste sto, trenutno stanje ", novac);
    } else {
      izbor = prompt("nemate dovoljno para. hocete li da uzmete kredit?(da ili ne)");
      if (izbor == "da") {
        let dug = -1 * novac;
        console.log("dug vam je ", dug);
      } else {
        novac += sto;
        console.log("nista niste kupili.")
      }
    }
    break;
  case "tv":
    novac -= tv;
    if (novac >= 0) {
      console.log("kupili ste tv, trenutno stanje ", novac);
    } else {
      izbor = prompt("nemate dovoljno para. hocete li da uzmete kredit?(da ili ne)");
      if (izbor == "da") {
        let dug = -1 * novac;
        console.log("dug vam je ", dug);
      } else {
        novac += tv;
        console.log("nista niste kupili.")
      }
    }
    break;
  default:
    console.log("nemamo taj artikal.")
    break;
}
