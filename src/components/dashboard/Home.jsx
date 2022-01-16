import React, { useEffect } from "react";
import ResponsiveAppBar from "../headers/Navbar";
import axios from "axios";

function Home() {
  const token = localStorage.getItem("token");
  console.log("now getting token", token);
  function postAuth() {
    axios
      .post("https://people-api-racl.herokuapp.com/api/auth", {
        email: "suresh@noveltytechnology.com",
        password: "P@ssw0rd",
      })
      .then(function (response) {
        console.log("now response with post", response.data.token);
        localStorage.setItem("token", response.data.token);
      });
  }

  useEffect(() => {
    postAuth();
  }, []);
  return (
    <div>
      <ResponsiveAppBar />
    </div>
  );
}

export default Home;
