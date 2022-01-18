import { TextField } from "@mui/material";
import React from "react";

function InputField({ label, type, value, onChange, error }) {
  return (
    <div className="InputField">
      <TextField
        type={type}
        id="outlined-error"
        label={label}
        size="small"
        fullWidth
        value={value}
        onChange={onChange}
        error={error}
      />
    </div>
  );
}

export default InputField;
