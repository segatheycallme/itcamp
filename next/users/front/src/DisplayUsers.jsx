import { useEffect, useState } from "react";

const url = "http://localhost:3000/api/users";
async function getData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    console.log("error fetching data");
  } catch (error) {
    console.log("error fetching data: " + error.toString())
  }
}
async function deleteUser(id) {
  try {
    const response = await fetch(url + "/" + id, { method: "DELETE" });
    if (!response.ok) {
      console.log("error deleting user");
    }
  } catch (error) {
    console.log("error deleting user: " + error.toString());
  }
}

async function addUser(email, password) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      method: "POST",
    });

    if (!response.ok) {
      console.log("error creating user");
    }
  } catch (error) {
    console.log("error creating user: " + error.toString());
  }
}

async function updateUser(id, email, password) {
  try {
    const response = await fetch(url + '/' + id, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      method: "PUT",
    });

    if (!response.ok) {
      console.log("error updating user");
    }
  } catch (error) {
    console.log("error updating user: " + error.toString());
  }
}

function DisplayUsers() {
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => { getData().then((res) => { setUsers(res) }) }, [refresh])

  return (
    <table className="border border-collapse border-slate-500">
      <thead>
        <tr>
          <th className="p-2">User id</th>
          <th className="p-2">Email</th>
          <th className="p-2">Password</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id: userId, email: userEmail, password: userPassword }) =>
          <tr key={userId}>
            <td className="p-2">{userId}</td>
            <td className="p-2">{userEmail}</td>
            <td className="p-2">{userPassword}</td>
            <td className="p-2">
              <button
                className="size-7 rounded-full bg-red-500 text-white font-bold"
                onClick={() =>
                  deleteUser(userId).then(() => setUsers(users.filter((item) => item.id != userId)))
                }>d</button>
            </td>
            <td className="p-2">
              <button
                className="size-7 rounded-full bg-slate-400 text-white font-bold"
                onClick={() => {
                  setId(userId)
                  setEmail(userEmail);
                  setPassword(userPassword);
                }}>e</button>
            </td>
          </tr>
        )}
        <tr className="mt-8">
          <td className="p-2">{id}</td>
          <td className="p-2"><input className="border-b-black border-b-2" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
          <td className="p-2 pr-4"><input className="border-b-black border-b-2" type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
          <td className="p-2"></td>
          <td className="p-2"><button
            className="size-7 rounded-full bg-blue-500 text-white font-bold"
            onClick={() => {
              if (id !== "") {
                updateUser(id, email, password).then(() => {
                  setUsers(users.map((item) => {
                    if (item.id === id) {
                      return { id, email, password };
                    }
                    return item;
                  }))
                  setId("");
                  setEmail("");
                  setPassword("");
                });
              } else {
                addUser(email, password).then(() => {
                  users.push({ id, email, password });
                  setId("");
                  setEmail("");
                  setPassword("");
                });
              }
            }}
          >{id === "" ? 'a' : 'e'}</button></td>
        </tr>
      </tbody>
    </table>
  )
}

export default DisplayUsers
