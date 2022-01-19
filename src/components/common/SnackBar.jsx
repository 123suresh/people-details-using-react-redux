import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SimpleSnackbar({
  openSnackBar,
  setOpenSnackBar,
  note,
}) {
  // const handleClick = () => {
  //   setOpenSnackBar(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={note}
        action={action}
      />
    </div>
  );
}
