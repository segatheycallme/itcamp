import React from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import QuotesPage from "./pages/QuotesPage/QuotesPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import ProtectedRoute from "./components/protect/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <div>
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
      <NavBar />
      <main className="main-main">
        <Routes>
          <Route path={"/"} element={<LoginPage />} />
          <Route
            path={"/quotes"}
            element={
              <ProtectedRoute>
                <QuotesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
