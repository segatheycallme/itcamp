import './App.css';
import { useState } from 'react';


function App() {
  const [broj1, setBroj1] = useState(0)
  const [broj2, setBroj2] = useState(0)
  const niz = []
  for (let i = 0; i < 98; i++) {
    niz.push(i)
  }

  return (
    <div className="App">
      <div className="inner">
        <div className='left'>
          {niz.map((el) => <button onClick={() => setBroj1(el)}>{el}</button>)}
        </div>
        <span className="aa"></span>
        <div className='right'>
          {niz.map((el) => <button onClick={() => setBroj2(el)}>{el}</button>)}
        </div>
      </div>
      <div className="inner2">
        <span>{broj1}</span>
        <span>+</span>
        <span>{broj2}</span>
        <span>=</span>
        <span>{broj1 + broj2}</span>
      </div>
    </div>
  );
}

export default App;
