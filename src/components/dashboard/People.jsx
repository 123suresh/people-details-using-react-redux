import { Snackbar, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import { deletePeople } from "../../services/localStorageCrud";
import CommonButton from "../common/CommonButton";
import DraggableDialog from "../common/Dialog";
import { getItem } from "../utils/localStorage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./PeopleList.scss";
import FormModal from "../common/Modal";

function People({ people }) {
  const [mode, setMode] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { fname, lname, email, gender, address, phone, id, key } = people;

  const handleDelete = () => {
    setDialog(true);
    handleOpenDialog();
    // setUserDetails(detail);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableRow
        key={key}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {fname}
        </TableCell>
        <TableCell align="left">{lname}</TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{gender}</TableCell>
        <TableCell align="left">{address}</TableCell>
        <TableCell align="left">{phone}</TableCell>
        <TableCell align="left">
          <div className="action">
            <DeleteIcon color="error" onClick={() => handleDelete()} />
            <span className="editIcons">
              <EditIcon
                color="success"
                onClick={() => {
                  //   e.preventDefault();
                  // handleEdit(index);
                  setMode("edit");
                }}
              />
            </span>
          </div>
        </TableCell>
      </TableRow>
      <FormModal
        open={mode === "edit" ? true : false}
        // handleOpen={handleOpen}
        setMode={setMode}
        mode={mode}
        //for localStorage
        // index={index}
        people={people}
      />
      {dialog ? (
        <DraggableDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleOpenDialog={handleOpenDialog}
          // setOpenDialog={setOpenDialog}
          deleteId={people.id}
          // id={id}
        />
      ) : null}
    </>
  );
}

export default People;
