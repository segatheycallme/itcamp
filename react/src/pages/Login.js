import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";


export default function Cas() {
  const [User, setUser] = useState({
    username: "",
    password: "",
  })
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
        <Typography textAlign={"center"} variant="h4" paddingBottom="0.5em">Welcome!</Typography>
        <TextField label="Username" onChange={(aaa) => { setUser({ username: aaa.target.value, password: User.password }) }} autoFocus />
        <TextField label="Password" onChange={(aaa) => { setUser({ username: User.username, password: aaa.target.value }) }} />
        <Button onClick={() => console.log(User)}>Submit</Button>
      </Paper>
    </Box>
  );
}

