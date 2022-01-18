import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const authValue = useSelector((state) => state.auth.isAuthenticated);

  return <div>{authValue ? <Outlet /> : <Navigate to="/" />}</div>;
}

export default PrivateRoute;
