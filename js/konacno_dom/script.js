//let objekat = {
//  "createdAt": "2024-03-29T23:54:43.992Z",
//  "name": "Doris Dach MD",
//  "pfp": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1017.jpg",
//  "bio": "Beatae illum saepe qui dolorum facilis temporibus aspernatur modi recusandae.",
//  "id": "4"
//}

fetch("https://65feccb8b2a18489b386933a.mockapi.io/api/v1/jedan").then(data => data.json()).then(data => {
  data.forEach(objekat => {
    let vreme = new Date(objekat.createdAt);
    document.body.innerHTML += `
  <div class="account" id="${objekat.id}">
    <img src="${objekat.pfp}">
    <div class="basic">
      <h2>${objekat.name}</h2>
      <h4>${objekat.bio}<h4>
    </div>
    <div class="adv">
      <div class="ddm">
        <h3>id: ${objekat.id}</h3>
        <h3>created at: ${vreme.toUTCString()}</h3>
      </div>
      <i class="fa-solid fa-circle-info"></i>
    </div>
  </div>
`;

  });
});
