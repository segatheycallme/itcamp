import './App.css';
import { useState } from 'react';


function App() {
  const [state, setState] = useState(1)
  const klik = () => {
    setState(state + 1)
  }
  const funkcija2 = () => {

    return < div >
      <h1 onClick={klik}>caoooo</h1>
      <h2>{state}</h2>
    </div >
  }

  return (
    <div className="App">
      <header className="App-header">
        {funkcija2()}
      </header>
    </div>
  );
}

export default App;
