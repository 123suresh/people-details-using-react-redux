import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "../dashboard/Detail";
import Home from "../dashboard/Home";
import PageNotFound from "../dashboard/PageNotFound";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";
// import ResponsiveAppBar from "../header/Navbar";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          {/* <Route element={<ResponsiveAppBar />}/> */}
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
