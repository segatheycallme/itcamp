// import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Hotels from "./pages/Hotels/Hotels";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Hotel from "./pages/Hotel/Hotel";
import Teams from "./pages/Teams/Teams";
import Quotes from "./pages/Quotes/Quotes";
import FourOFour from "./pages/404/404";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const { user, setUser } = useContext(AppContext)
  useEffect(() => {
    const localUser = localStorage.getItem("user")
    if (localUser) {
      setUser(JSON.parse(localUser))
    }
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={!user ? <Auth /> : <Home />} />
            {user ?
              <>
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotels/:id" element={<Hotel />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/*" element={<FourOFour />} />
              </>
              : <Route path="/*" element={<Auth />} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
