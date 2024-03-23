const podaci = [
  { id: 1, ime: "Kemal" },
  { id: 2, ime: "Veljko" },
  { id: 9, ime: "Ahahahahaaaa" },
  { id: 3, ime: "Nadija" },
  { id: 4, ime: "Sergej" },
  { id: 5, ime: "Nerma" },
  { id: 6, ime: "Ahmed" },
  { id: 7, ime: "Mervan" },
  { id: 8, ime: "Faris" },
  { id: 9, ime: "Ahmed" },
];

let current_page = 1; // prompt("Unesite stranicu: ");
const elements_per_page = 10;
const max_pages = Math.ceil(podaci.length / elements_per_page);

// prvi zadatak
let page = podaci.slice(current_page * elements_per_page - elements_per_page, current_page * elements_per_page);
console.log(page);

// drugi zadatak
let ponavljanje = {};
let page_copy = page.slice(0, -1);
for (let i = 0; i < page_copy.length; i++) {
  const el = page_copy[i].ime;
  if (ponavljanje[el] == undefined) {
    ponavljanje[el] = 1;
  } else {
    ponavljanje[el]++;
    page_copy.splice(i, 1);
  }
};

console.log(ponavljanje)
console.log(page_copy)

// treci zadatak
page_copy = page.filter((el) => el.ime.search("^Ah") + 1);
console.log(page_copy)

// cetvrti zadatak
page_copy = page.slice(0, 10);
ponavljanje = {};
for (let i = 0; i < page_copy.length; i++) {
  let el = page_copy[i];
  if (ponavljanje[el.id] == undefined) {
    ponavljanje[el.id] = 1;
  } else {
    while (ponavljanje[el.id] != undefined) {
      el.id = Math.floor(Math.random() * 1000);
    }
  }
};
console.log(page_copy);
