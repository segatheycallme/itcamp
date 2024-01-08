let broj1 = Number(prompt("Unesite prvi broj"));
let operacija = prompt("Unesite operaciju");
let broj2 = Number(prompt("Unesite drugi broj"));

if (isNaN(broj1) || isNaN(broj2)) {
  console.log("Niste uneli brojeve");
} else {

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

    default:
      console.log("Nepostojeca operacija uneta");
      break;
  }
}
