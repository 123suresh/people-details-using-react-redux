import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { deletePeopleDetail } from "../../action/crud";
import CommonButton from "./CommonButton";
import SimpleSnackbar from "./SnackBar";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({
  openDialog,
  handleOpenDialog,
  handleCloseDialog,
  id,
}) {
  let dispatch = useDispatch();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [disable, setDisable] = React.useState(false);

  const handleDelete = async () => {
    setDisable(true);
    await dispatch(deletePeopleDetail(id));
    handleCloseDialog();
    setDisable(false);
    setOpenSnackBar(true);
  };
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CommonButton
            buttonName="cancel"
            onClick={handleCloseDialog}
            color="error"
            size="small"
          />
          <CommonButton
            buttonName="confirm"
            onClick={handleDelete}
            size="small"
            disabled={disable}
          />
        </DialogActions>
      </Dialog>
      <div className="snack__bar">
        {openSnackBar ? (
          <SimpleSnackbar
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            note="Detail is successfully deleted"
          />
        ) : null}
      </div>
    </div>
  );
}
