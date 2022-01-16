import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authOnRefresh } from "../actions/Authentication";

function PrivateRoute() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOnRefresh(true));
  }, []);
  const authValue = useSelector((state) => state.auth.isAuthenticated);
  return <div>{authValue ? <Outlet /> : <Navigate to="/" />}</div>;
}

export default PrivateRoute;
