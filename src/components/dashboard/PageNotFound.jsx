import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../common/CommonButton";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>404 Error Page not found</h3>
      <CommonButton onClick={() => navigate(-1)} buttonName="Go Back" />
    </div>
  );
};

export default PageNotFound;
