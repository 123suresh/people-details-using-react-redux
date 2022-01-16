import { Box } from "@mui/material";
import React, { useState } from "react";
import CommonButton from "../commons/CommonButton";
import InputField from "../commons/InputField";
import "./Login.scss";
import { auth } from "../actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginName = "a";
  const loginPassword = "b";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === loginName && password === loginPassword) {
      dispatch(auth(true));
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
            label="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
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
