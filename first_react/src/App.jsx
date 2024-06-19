// import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Hotels from "./pages/Hotels/Hotels";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import Teams from "./pages/Teams/Teams";
import Quotes from "./pages/Quotes/Quotes";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
