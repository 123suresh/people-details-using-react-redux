import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../dashboard/Home";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
