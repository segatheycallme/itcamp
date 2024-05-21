import React from "react";
import { Route, Routes } from 'react-router-dom';
import Cas from './pages/Cas';
import Calc from './pages/Calc';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Cas />}></Route>
      <Route path='/calc' element={<Calc />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path="*" element={<h1>404 NOT FOUND</h1>}></Route>
    </Routes>
  );
}

export default App;
