import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Cas from './pages/Cas';
import Calc from './pages/Calc';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  return (
    <Routes>
      <Route path='/' element={<Cas user={user} />}></Route>
      <Route path='/calc' element={<Calc />}></Route>
      <Route path='/login' element={<Login user={user} setUser={setUser} />}></Route>
      <Route path="*" element={<h1>404 NOT FOUND</h1>}></Route>
    </Routes>
  );
}

export default App;
