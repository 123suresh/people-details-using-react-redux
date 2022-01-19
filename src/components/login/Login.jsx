import { Box } from "@mui/material";
import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import InputField from "../common/InputField";
import "./Login.scss";
import { auth } from "../../action/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import setAuthHeader from "../utils/setAuthHeader";

function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const loginName = "suresh@noveltytechnology.com";
  const loginPassword = "P@ssw0rd";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === loginName && password === loginPassword) {
      axios
        .post(`${process.env.REACT_APP_API}/auth`, {
          email: "suresh@noveltytechnology.com",
          password: "P@ssw0rd",
        })
        .then(function (response) {
          dispatch(auth(response.data.token));
          setAuthHeader(response.data.token);
        });
    } else {
      if (userName !== loginName) {
        setNameErr(true);
      }
      if (password !== loginPassword) {
        setPasswordErr(true);
      }
    }
  };

  if (isAuthenticated) return <Navigate to="/home" />;
  return (
    <div>
      <div className="login__main">
        <h2>Login</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Email"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={nameErr}
            helperText={nameErr ? "Invalid username" : ""}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            error={passwordErr}
            helperText={passwordErr ? "Invalid password" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <CommonButton type="submit" buttonName="Login" />
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Login;
