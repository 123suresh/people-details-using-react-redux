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
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userName === "" || password === "") {
        setErr(true);
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API}/auth`, {
          email: userName,
          password: password,
        });
        dispatch(auth(response.data.token));
        setAuthHeader(response.data.token);
      }
    } catch (error) {
      setErr(true);
    }
  };

  if (isAuthenticated) return <Navigate to="/peopleList" />;
  return (
    <div>
      <div className="login__main">
        <div className="login__box">
          <div className="login__header">
            <h2>LOGIN</h2>
          </div>
          <div className="login__label">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
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
                error={err}
                id="user__email"
              />
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={err}
                id="user_password"
              />
              <div className="login__button">
                <CommonButton type="submit" buttonName="Login" />
              </div>
              <div className="validation__text">
                {err ? <p>Invalid email or password</p> : null}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
