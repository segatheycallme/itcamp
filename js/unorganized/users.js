fetch("https://65feccb8b2a18489b386933a.mockapi.io/api/v1/jedan").then(data => data.json()).then(data => {
  data.forEach(el => {
    let divv = document.createElement("div");
    divv.innerHTML = `
  <div class="korisnik">
    <h1 class="ime">${el.name}</h1>
    <h3 class="vreme">${el.createdAt}</h3>
    <h3 class="id">${el.id}</h3>
    <img src="${el.pfp}">
  </div>`;
    document.body.appendChild(divv);
  })
})
