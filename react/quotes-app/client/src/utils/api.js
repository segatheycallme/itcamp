import ky from "ky";

export async function logIn(username, password) {
  return ky.post("http://localhost:8000/sessions", { json: { username, password } }).json()
    .then((json) => {
      return json.accessToken
    }).catch(() => {
      return Promise.reject("401")
    })
}
