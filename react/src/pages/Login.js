import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const bestUser = {
  username: "mervan",
  password: "123",
}

export default function Cas(props) {
  const navigate = useNavigate()
  const { user, setUser } = props
  const [goodInput, setGoodInput] = useState(false)
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}>
      <Paper sx={{
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
      }} elevation={6}>
        <Typography textAlign={"center"} variant="h5" paddingBottom="1em">Welcome!</Typography>
        <TextField label="Username*" onChange={(aaa) => { setUser({ username: aaa.target.value, password: user.password }) }} autoFocus value={user.username} error={goodInput} />
        <TextField type="password" label="Password*" onChange={(aaa) => { setUser({ username: user.username, password: aaa.target.value }) }} value={user.password} error={goodInput} />
        <Button color={goodInput ? "error" : "primary"} onClick={() => {
          if (user.username === bestUser.username && user.password === bestUser.password) {
            navigate("/")
          }
          else {
            setGoodInput(true)
            setUser({ username: "", password: "" })
          }
        }}>Submit</Button>
      </Paper>
    </Box>
  );
}
