import React from "react";
import CommonButton from "../commons/CommonButton";
import { useDispatch } from "react-redux";
import { auth } from "../reducers/Auth";

function Home() {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(auth(false));
  };
  return (
    <div>
      <p>home page</p>
      <CommonButton buttonName="Logout" onClick={handleLogout} />
    </div>
  );
}

export default Home;
