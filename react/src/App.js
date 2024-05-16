import './App.css';
import React, { useState } from "react";
import Dugmic from './components/Dugmic';
import { Typography } from '@mui/material';


function App() {
  const [active, setActive] = useState(true)
  return (
    <div>
      <Dugmic active={active} setActive={setActive}></Dugmic>
      <Typography>dugmic je {active ? "aktivan" : "neaktivan"}</Typography>
    </div >
  );
}

export default App;
