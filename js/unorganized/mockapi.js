fetch("https://65feccb8b2a18489b386933a.mockapi.io/api/v1/jedan").then(res => res.json()).then(data => {
  let id = prompt("Unesite id korisnika od 1 do " + data.length);
  if (id >= data.length || data.length < 0) {
    console.log("Los index");
  } else {
    console.log(data[id - 1]);
  }
})
