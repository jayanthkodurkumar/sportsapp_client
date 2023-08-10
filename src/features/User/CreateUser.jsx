import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Stack, TextField } from "@mui/material";

const CreateUser = () => {
  const SIGNUP_URL = "http://localhost:5000/createuser";
  const navigate = useNavigate();
  const viewlogin = "/login";
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      setErr("Passwords do not match!");
      return;
    }
    axios
      .post(SIGNUP_URL, user)
      .then((response) => {
        navigate(viewlogin);
      })
      .catch((error) => {
        if (
          user.first_name === "" ||
          user.last_name === "" ||
          user.user_name === "" ||
          user.dob === null ||
          user.password === ""
        ) {
          setErr("All the fields must be filled!");
        } else {
          setErr(
            "Something went wrong! " + error.response.data + "! Try again!"
          );
        }
      });
  };

  return (
    <>
      <h1>CREATE AN ACCOUNT</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={user.last_name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Username"
          name="user_name"
          value={user.user_name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={user.dob}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={user.confirmPassword}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
      {err && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{err}</Alert>
        </Stack>
      )}
    </>
  );
};

export default CreateUser;
