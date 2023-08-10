import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchLoginData, loginFailure } from "./loginSlice";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.login.user);
  const error = useSelector((state) => state.login.error);

  const [loginData, setLoginData] = useState({
    user_name: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const HOME_URL = "/";
  const handleSubmit = () => {
    try {
      dispatch(fetchLoginData(loginData));
      navigate(HOME_URL);
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
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error.message}</Alert>
        </Stack>
      )}{" "}
      :{" "}
      {user && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Sucessfully Logged in!</Alert>{" "}
        </Stack>
      )}
    </div>
  );
};

export default Login;
