import { Button, Typography } from "@mui/joy";
import "./Navbar.css"
import { useContext } from "react";
import { userContext } from "../../App";

export default function Navbar() {
  const { accessToken, setAccessToken } = useContext(userContext)
  return (
    <header>
      <Typography level="h1" color="primary">Quotes</Typography>
      {accessToken ?
        <Button variant="soft" size="lg" onClick={() => {
          setAccessToken("")
        }}>LOGOUT</Button>
        : <></>}
    </header>
  )
}
