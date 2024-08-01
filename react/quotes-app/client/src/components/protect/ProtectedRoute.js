import React, { useContext, useEffect } from "react";
import GoToLogin from "../modals/GoToLogin";
import { TokenContext } from "../../context/TokenContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useContext(TokenContext);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);
  return (
    <>
      {!localStorage.getItem("accessToken") ? <GoToLogin /> : <>{children}</>}
    </>
  );
};

export default ProtectedRoute;
