import ky from "ky";

const BACKEND_IP = "http://localhost:8000"
export async function logIn(username, password) {
  return (await ky.post(BACKEND_IP + "/sessions", { json: { username, password } }).json()).accessToken
}

export async function getQuotes(pageSize, page, token, filters) {
  return await ky.get(BACKEND_IP + "/quotes", { headers: { Authorization: "Bearer " + token }, searchParams: { pageSize, page, ...filters } }).json()
}

export async function getTags(token) {
  return await ky.get(BACKEND_IP + "/tags", { headers: { Authorization: "Bearer " + token } }).json()
}

export async function vote(newVote, oldVote, id, token) {
  if (oldVote !== "none") {
    await ky.delete(BACKEND_IP + "/quotes/" + id + "/" + oldVote, { headers: { Authorization: "Bearer " + token } })
  }
  if (oldVote !== newVote) {
    await ky.post(BACKEND_IP + "/quotes/" + id + "/" + newVote, { headers: { Authorization: "Bearer " + token } })
  }
}

export async function submitQuote(author, quote, tags, token) {
  await ky.post(BACKEND_IP + "/quotes", { json: { author, content: quote, tags }, headers: { Authorization: "Bearer " + token } })
}
