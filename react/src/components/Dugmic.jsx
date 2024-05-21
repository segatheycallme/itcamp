import React from "react";
import { Button } from '@mui/material';

function randomColor(colors, lastColor) {
  const newColor = colors[Math.floor(Math.random() * colors.length)]
  if (newColor === lastColor[0] || newColor === lastColor[1]) {
    return randomColor(colors, lastColor)
  }

  return [newColor, lastColor[0]]
}

function Dugmic(props) {
  console.log(props)
  const { lastColors, setColor, children } = props;
  const colors = ["primary", "secondary", "error", "warning", "info"];
  return (
    <Button variant="contained" color={lastColors[0]} onClick={() => { setColor(randomColor(colors, lastColors)) }}>{children}</Button>
  );
}

export default Dugmic
