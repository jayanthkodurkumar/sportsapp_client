import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchLoginData, loginFailure, loginSuccess } from "./loginSlice";
import { Button, Container, TextField } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const user = useSelector((state) => state.login.user);
  const error = useSelector((state) => state.login.error);

  const [loginData, setLoginData] = useState({
    user_name: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      dispatch(fetchLoginData(loginData));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  return (
    <div>
      <h1>Login </h1>
      <Container>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <TextField
            label="User Name"
            name="user_name"
            // value={formData.first_name}
            onChange={(e) => handleChange("user_name", e.target.value)}
            required
          />
          <TextField
            label="Password"
            name="password"
            value={loginData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />

          <Button
            variant="contained"
            style={{ backgroundColor: "#228B22" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;