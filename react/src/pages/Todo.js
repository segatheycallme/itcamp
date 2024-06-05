import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Cas() {
  const [buf, setBuf] = useState("");
  const [todos, _] = useState([]);
  const [render, rerender] = useState(true);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minHeight: "100vh" }}>
      <Paper elevation={8} sx={{ minWidth: "400px", minHeight: "400px" }}>
        <TextField onChange={(e) => { setBuf(e.target.value) }} value={buf}></TextField>
        <Button variant="outlined" onClick={() => { if (buf.trim() !== "") { todos.push(buf) }; setBuf("") }}>dodaj</Button>
        <Button variant="outlined" onClick={() => { todos.pop(); rerender(!render) }}>izbrisi</Button>
        {todos.map((val) => { return (<Typography>{val}</Typography>) })}
      </Paper>
    </Box >
  );
}

