let counter = 0;
const content = "<h1>test znanja</h1><button id='btn'>klikni me</button>";

let container = document.querySelector(".container");
container.innerHTML = content;

let btn = document.getElementById("btn");
console.log(btn)
btn.addEventListener("click", () => {
  counter++;
  container.getElementsByTagName("h1")[0].innerHTML = "Bravo! br." + counter;
  container.getElementsByTagName("h1")[0].style.color = "red";
  container.getElementsByTagName("h1")[0].style.fontSize = "100px";
});
