import React, { useContext, useState } from "react";
import { TokenContext } from "../../context/TokenContext";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Group,
  Alert,
} from "@mantine/core";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(TokenContext);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/sessions", {
        username: userData.username,
        password: userData.password,
      })
      .then((response) => {
        // console.log(response.data.accessToken);
        setInvalidCredentials(false);
        setAccessToken(response.data.accessToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/quotes");
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setInvalidCredentials(true);
          setAccessToken(null);
          localStorage.removeItem("accessToken");
        } else {
          console.log(error);
          setInvalidCredentials(true);
          setAccessToken(null);
          localStorage.removeItem("accessToken");
        }
      });
  };
  return (
    <div className="main-login">
      <Box sx={{ minWidth: 340 }} mx="auto" className="login-box">
        <form onSubmit={handleLogin}>
          {invalidCredentials ? (
            <Alert radius="md" title="Invalid credentials!" color="red">
              Invalid username or password
            </Alert>
          ) : (
            <></>
          )}
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Username"
            value={userData.username}
            onChange={(event) =>
              setUserData((prev) => ({
                ...prev,
                username: event.target.value,
              }))
            }
            required
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Password"
            value={userData.password}
            onChange={(event) =>
              setUserData((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            required
          />

          <Group
            position="right"
            mt="xl"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              uppercase
              color="teal"
              radius="md"
              style={{ width: "10rem", letterSpacing: "0.07rem" }}
            >
              LOGIN
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default LoginPage;
