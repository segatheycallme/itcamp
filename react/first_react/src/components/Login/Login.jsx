import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"

export default function Login() {
  const [badInput, setBadInput] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(AppContext)

  return (
    <form onSubmit={(event) => {
      event.preventDefault()

      const localUsers = localStorage.getItem("users")
      let users = []
      if (localUsers) {
        users = JSON.parse(localUsers)
      }

      const index = users.findIndex((val) => val.username == username && val.password == password)

      if (index > -1) {
        setUser(users.find((val) => val.username == username))
      } else {
        setBadInput(true)
        setUsername("")
        setPassword("")
      }

    }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <TextField error={badInput}
          value={username}
          onChange={(event) => {
            setBadInput(false);
            setUsername(event.currentTarget.value)
          }}
          label="Username"
          required
        ></TextField>
        <TextField error={badInput}
          helperText={badInput ? "Bad username or password" : ""}
          type="password"
          value={password}
          onChange={(event) => {
            setBadInput(false);
            setPassword(event.currentTarget.value)
          }}
          label="Password"
          required
        ></TextField>
        <Button type="submit">submit</Button>
      </Box>
    </form>
  )
}
