import React from "react";
import { Button } from '@mui/material';

function randomColor(colors, lastColor) {
  const newColor = colors[Math.floor(Math.random() * colors.length)]
  if (newColor === lastColor) {
    return randomColor(colors, lastColor)
  }

  return newColor
}

function Dugmic(props) {
  console.log(props)
  const { lastColor, setColor, children } = props;
  const colors = ["primary", "secondary", "error", "warning", "info"];
  return (
    <Button variant="contained" color={lastColor} onClick={() => { setColor(randomColor(colors, lastColor)) }}>{children}</Button>
  );
}

export default Dugmic
