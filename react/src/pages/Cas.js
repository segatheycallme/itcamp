import React, { useState } from "react";
import Dugmic from '../components/Dugmic';
import { Typography } from '@mui/material';


export default function Cas() {
  const [color, setColor] = useState(["primary", "secondary"])
  return (
    <div>
      <Dugmic lastColors={color} setColor={setColor}>zdravoooooooooo</Dugmic>
      <Typography>dugmic je {color[0]}</Typography>
    </div >
  );
}

