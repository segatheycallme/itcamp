import React from "react";
import { Button, createTheme, ThemeProvider } from '@mui/material';

function Dugmic(props) {
  const active = props.active;
  const setActive = props.setActive;
  const theme = createTheme({
    palette: {
      bluu: {
        main: '#22509a',
        light: '#ff00ff',
        dark: '#2961ba',
        contrastText: '#9fcfff',
      },
      gree: {
        main: '#767676',
        light: '#ff00ff',
        dark: '#6a6a6a',
        contrastText: '#1a1a1a',
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color={active ? "bluu" : "gree"} onClick={() => { setActive(!active) }}>
        {active ? "ACTIVE" : "INACTIVE"}
      </Button>
    </ThemeProvider>
  );
}

export default Dugmic
