import { Button } from "@mui/material";
import React from "react";

function CommonButton({ type, buttonName, onClick }) {
  return (
    <div>
      <Button variant="contained" type={type} onClick={onClick}>
        {buttonName}
      </Button>
    </div>
  );
}

export default CommonButton;
