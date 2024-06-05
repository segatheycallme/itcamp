// import { useState } from "react";
import "./App.css";
// import MySentence from "./components/MySentence/MySentence";
// import Greeting from "./components/Greeting/Greeting";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Hotels from "./pages/Hotels/Hotels";
import Hotel from "./pages/Hotel/Hotel";

function App() {
  // const [count, setCount] = useState(0);
  // const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // const arr = []
  // for (let i = 1; i <= 10; i++) {
  //   arr.push(i);
  // }

  // const reverseArr = () => {
  //   const _arr = [...arr];
  //   const reversed = _arr.reverse();
  //   setArr(reversed);
  // };

  // const osoba = {
  //   name: "Jakub",
  //   age: 17,
  // };

  // destructuring objekta
  // const { name } = osoba;
  // console.log(name);
  // CEMU JE JEDNAKO name?
  // name === osoba.name

  // const osobaNiz = ["Kanita", 19];
  // destructuring niza
  // const [ime] = osobaNiz;
  // console.log(ime);

  // const a = 5
  // a++ === a = a + 1
  // a+1
  // setCount((prevValue) => prevValue++) NIJE KOREKTNO
  // setCount((prevValue) => prevValue + 3)
  return (
    // <React.Fragment>
    <div className="app">
      {/* <Greeting appName="Lyntel" fullName="Dzenan Kosuta" /> */}
      {/* <div className="card">
        <button onClick={() => setCount((prevValue) => prevValue - 1)}>
          decrease count {count}
        </button>
        <button onClick={() => setCount((prevValue) => prevValue + 1)}>
          increase count {count}
        </button>
      </div> */}
      {/* <button onClick={reverseArr}>Change order</button> */}
      {/* Ipravno i sa callback */}
      {/* <button onClick={() => reverseArr()}>Change order</button>
      {arr.map((num, index) => (
        <div
          key={index}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <p>{num}. </p>
          <MySentence number={num} />
        </div>
      ))} */}
      <Navbar />
      <main className="main">
        <div className="hotels">
          <Routes>
            <Route path="/" element={<p>Pocetna stranica</p>} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<Hotel />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
    // </React.Fragment>
  );
}

export default App;
