import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Cas() {
  const [buf, setBuf] = useState("");
  const [todos, _] = useState([]);

  console.log(buf)
  console.log("todos:", todos)
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minHeight: "100vh" }}>
      <Paper elevation={8} sx={{ minWidth: "400px", minHeight: "400px" }}>
        <TextField onChange={(e) => { setBuf(e.target.value) }} value={buf}></TextField>
        <Button onClick={() => { if (buf.trim() !== "") { todos.push(buf) }; setBuf("") }}>klik</Button>
        {todos.map((val) => { return (<Typography>{val}</Typography>) })}
      </Paper>
    </Box >
  );
}

