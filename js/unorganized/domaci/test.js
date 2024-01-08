let broj1 = Number(prompt("Unesite prvi broj"));
while (isNaN(broj1)) {
  broj1 = Number(prompt("Unesite prvi broj"));
}

let operacija = prompt("Unesite operaciju");
while (operacija != "+" && operacija != "-" && operacija != "*" && operacija != "/") {
  operacija = prompt("Unesite operaciju");
}

let broj2 = Number(prompt("Unesite drugi broj"));
while (isNaN(broj2)) {
  broj2 = Number(prompt("Unesite drugi broj"));
}

switch (operacija) {
  case "+":
    console.log(broj1 + broj2);
    break;

  case "-":
    console.log(broj1 - broj2);
    break;

  case "*":
    console.log(broj1 * broj2);
    break;

  case "/":
    console.log(broj1 / broj2);
    break;
}
