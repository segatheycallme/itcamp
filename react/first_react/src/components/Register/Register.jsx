import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

export default function Register() {
  return (
    <form onSubmit={(event) => {
      const localUsers = localStorage.getItem("users")
      const user = {
        fname: event.currentTarget.elements.fname.value,
        lname: event.currentTarget.elements.lname.value,
        username: event.currentTarget.elements.username.value,
        email: event.currentTarget.elements.email.value,
        password: event.currentTarget.elements.password.value,
      }

      if (localUsers) {
        localStorage.setItem("users", JSON.stringify(JSON.parse(localUsers).concat([user])))
      } else {
        localStorage.setItem("users", JSON.stringify([user]))
      }
    }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <TextField required id="fname" label="First name"></TextField>
        <TextField required id="lname" label="Last name"></TextField>
        <TextField required id="username" label="Username"></TextField>
        <TextField required id="email" type="email" label="Email"></TextField>
        <TextField required id="password" type="password" label="Password"></TextField>
        <Button type="submit">submit</Button>
      </Box>
    </form>
  )
}
