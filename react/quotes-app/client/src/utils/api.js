import ky from "ky";

const BACKEND_IP = "http://localhost:8000"
export async function logIn(username, password) {
  return (await ky.post(BACKEND_IP + "/sessions", { json: { username, password } }).json()).accessToken
}

export async function getQuotes(pageSize, page, token) {
  return await ky.get(BACKEND_IP + "/quotes", { headers: { Authorization: "Bearer " + token }, searchParams: { pageSize, page } }).json()
}

export async function vote(newVote, oldVote, id, token) {
  if (oldVote !== "none") {
    await ky.delete(BACKEND_IP + "/quotes/" + id + "/" + oldVote, { headers: { Authorization: "Bearer " + token } })
  }
  if (oldVote !== newVote) {
    await ky.post(BACKEND_IP + "/quotes/" + id + "/" + newVote, { headers: { Authorization: "Bearer " + token } })
  }
}
