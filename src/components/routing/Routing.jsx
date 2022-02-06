import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "../dashboard/PageNotFound";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";
import PeopleList from "../dashboard/PeopleList";
// import ResponsiveAppBar from "../header/Navbar";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          {/* <Route element={<ResponsiveAppBar />}/> */}
          <Route path="/peopleList" element={<PeopleList />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default Routing;
