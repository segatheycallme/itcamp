import { Button, Card, CardActions, CardContent, Divider, Input, Stack, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { logIn } from "../../utils/api";
import { userContext } from "../../App";


export default function LogIn() {
  const { setAccessToken } = useContext(userContext)

  let [error, setError] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Stack justifyContent="center" alignItems="center" minHeight="calc(100vh - 6em)">
      <Card variant="outlined" color="primary" sx={{ padding: "3em" }}>
        <Typography textAlign="center" level="h4">Log in</Typography>
        <Divider inset="none" sx={{ marginBottom: "2em" }} />
        <CardContent>
          <form onSubmit={(event) => {
            event.preventDefault()
            logIn(username, password).then((token) => { setAccessToken(token) }).catch(() => {
              setError(true)
              setUsername("")
              setPassword("")
            })
          }}>
            <Input error={error} value={username} onChange={(event) => { setUsername(event.target.value) }} placeholder="Username" size="lg" required sx={{ marginBottom: "0.6em" }} />
            <Input error={error} value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder="Password" size="lg" required type="password" />
            {error ? <Typography level="body-md" ml="0.5em" mt="1em" color="danger">Incorrect username or password</Typography> : <></>}
            <CardActions>
              <Button size="lg" type="submit">LOG IN</Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Stack >
  )
}
