import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    navigate("/");
    window.scrollTo(0, 0);
  };

  const values = {
    accessToken,
    setAccessToken,
    handleLogout,
  };
  return (
    <TokenContext.Provider value={values}>{children}</TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
