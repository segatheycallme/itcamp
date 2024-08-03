import ky from "ky";

export async function logIn(username, password) {
  return (await ky.post("http://localhost:8000/sessions", { json: { username, password } }).json()).accessToken
}

export async function getQuotes(token) {
  return await ky.get("http://localhost:8000/quotes", { headers: { Authorization: "Bearer " + token } }).json()
}
