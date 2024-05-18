import { ThemeProvider } from "@emotion/react";
import { Box, Button, createTheme, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

function bol(buffer) {
  const broj = eval(buffer.replace(/[^-()\d/x+.]/g, '').replace(/x/g, "*"))
  if (Number.isInteger(broj)) {
    return String(broj)
  }
  return String(broj.toFixed(5)).replace(/0+$/g, "");


}

export default function Calc() {
  const [buffer, setBuffer] = useState("")

  const dugmici = [
    "(", ")", "/",
    "7", "8", "9", "x",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", "00", "."
  ]

  const theme = createTheme({
    palette: {
      jednako: {
        light: '#f0f',
        main: '#ff8146',
        dark: '#eb7640',
        contrastText: '#fff',
      },
      norm: {
        light: '#999',
        main: '#888',
        dark: '#777',
        contrastText: '#fff',
      },
    },
  });
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <Paper sx={{ padding: "1.2em", bgcolor: "#f9f9f9" }} elevation={5}>
        <Grid container spacing={2} maxWidth="300px">
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>{buffer ? buffer : "0"}</Typography>
          </Grid>
          <ThemeProvider theme={theme}>
            <Grid item xs={3}>
              <Button variant="contained" color="jednako" sx={{ fontSize: "1.5em" }} fullWidth onClick={() => { setBuffer("") }}>AC</Button>
            </Grid>
            {dugmici.map((el, i) => {
              return <Grid item xs={3} key={i}>
                <Button variant="contained" color="norm" sx={{ fontSize: "1.5em" }} fullWidth onClick={() => { setBuffer(buffer + el) }}>{el.toLowerCase()}</Button>
              </Grid>
            })}
            <Grid item xs={3}>
              <Button variant="contained" color="jednako" sx={{ fontSize: "1.5em" }} fullWidth onClick={() => { setBuffer(bol(buffer)) }}>=</Button>
            </Grid>
          </ThemeProvider>
        </Grid>
      </Paper>
    </Box >
  );
}
