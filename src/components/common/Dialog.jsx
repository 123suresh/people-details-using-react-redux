import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import {
  deletePeopleDetail,
  deletePeopleList,
  deletePeopleLists,
} from "../../action/crud";
import CommonButton from "./CommonButton";
import SimpleSnackbar from "./SnackBar";
import { deletePeoples } from "../../services/localStorageCrud";
import { CLEAR_DATA } from "../../constant/actionTypes";

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
  // setOpenDialog,
  handleOpenDialog,
  handleCloseDialog,
  deleteId,
  dialogForExistValue,
  setDialogForExistValue,
  closeDialogInModal,
}) {
  let dispatch = useDispatch();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [disable, setDisable] = React.useState(false);

  //for snackbar

  const handleDelete = () => {
    setDisable(true);
    // setOpenSnackBar(true);
    dispatch(deletePeopleList(deleteId));
    // await deletePeoples(deleteId);
    // await dispatch(deletePeopleDetail(id));
    handleCloseDialog();
    setDisable(false);
  };

  const handleExistedValue = () => {
    closeDialogInModal();
  };

  return (
    <>
      <Dialog
        open={openDialog || dialogForExistValue}
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {dialogForExistValue ? "Value Exist" : "Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogForExistValue
              ? "Email or Phone Number already exist"
              : "Are you sure you want to delete"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {dialogForExistValue ? null : (
            <CommonButton
              buttonName="cancel"
              onClick={handleCloseDialog}
              color="error"
              size="small"
            />
          )}
          <CommonButton
            buttonName={dialogForExistValue ? "Try Again" : "confirm"}
            onClick={dialogForExistValue ? handleExistedValue : handleDelete}
            size="small"
            disabled={disable}
          />
        </DialogActions>
      </Dialog>
      {/* {openSnackBar ? (
        <SimpleSnackbar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          note="People is successfully deleted"
        />
      ) : null} */}
    </>
  );
}
