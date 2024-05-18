import React from "react";
import { Route, Routes } from 'react-router-dom';
import Cas from './pages/Cas';
import Calc from './pages/Calc';

function App() {
  return (
    <Routes>
      <Route path='/' Component={Cas}></Route>
      <Route path='/calc' Component={Calc}></Route>
    </Routes>
  );
}

export default App;
