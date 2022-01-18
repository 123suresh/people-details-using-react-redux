import { Button } from "@mui/material";
import React from "react";

function CommonButton({ type, buttonName, onClick, size, color }) {
  return (
    <div>
      <Button
        variant="contained"
        type={type}
        onClick={onClick}
        size={size}
        color={color}
      >
        {buttonName}
      </Button>
    </div>
  );
}

export default CommonButton;
