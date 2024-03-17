const podaci = [
  { id: 1, ime: "Kemal" },
  { id: 2, ime: "Veljko" },
  { id: 3, ime: "Nadija" },
  { id: 4, ime: "Sergej" },
  { id: 5, ime: "Nerma" },
  { id: 6, ime: "Ahmed" },
  { id: 7, ime: "Mervan" },
  { id: 8, ime: "Faris" },
  { id: 9, ime: "Ahmed" },
  { id: 10, ime: "Ahmed" },
];

let page = 2; //prompt("Unesite stranicu: ");
const elements_per_page = 2;
const max_pages = Math.ceil(podaci.length / elements_per_page);

console.log(podaci.slice(page * elements_per_page - elements_per_page, page * elements_per_page))
