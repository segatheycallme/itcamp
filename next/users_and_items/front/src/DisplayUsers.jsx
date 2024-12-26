import { useEffect, useState } from "react";

async function getData() {
  const url = "http://localhost:3000/api/users";
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    console.log("error fetching data: app returned: " + response.status)
  } catch (error) {
    console.log("error fetching data: " + error.toString())
  }
}

function DisplayUsers() {
  useEffect(() => { getData().then((res) => { setUsers(res) }) }, [])

  const [users, setUsers] = useState([]);

  return (
    <table>
      <thead>
        <tr>
          <th>User id</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, email, password }) =>
          <tr key={id}>
            <td className="px-10">{id}</td>
            <td className="px-10">{email}</td>
            <td className="px-10">{password}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default DisplayUsers
