import React, { useState } from "react";
import Dugmic from '../components/Dugmic';
import { Typography } from '@mui/material';


export default function Cas() {
  const [active, setActive] = useState(true)
  return (
    <div>
      <Dugmic active={active} setActive={setActive}></Dugmic>
      <Typography>dugmic je {active ? "aktivan" : "neaktivan"}</Typography>
    </div >
  );
}

