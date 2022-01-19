import { TextField } from "@mui/material";
import React from "react";

function InputField({ label, type, value, onChange, error, helperText }) {
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
        helperText={helperText}
      />
    </div>
  );
}

export default InputField;
