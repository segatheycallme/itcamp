import React, { useState } from "react";
import Dugmic from '../components/Dugmic';
import { Typography } from '@mui/material';


export default function Cas(props) {
  const [color, setColor] = useState(["primary", "secondary"])
  return (
    <div>
      <Dugmic lastColors={color} setColor={setColor}>zdravoooooooooo</Dugmic>
      <Typography>dugmic je {color[0]}</Typography>
      <Typography>username: {props.user.username}</Typography>
      <Typography>password: {props.user.password}</Typography>
    </div >
  );
}

