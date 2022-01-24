import { useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePeople } from "../../action/crud";
import DraggableDialog from "../common/Dialog";
import BasicModal from "../common/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import SkeletonColor from "../common/Skeleton";

function CommonTable() {
  const detail = useSelector((state) => state.detail.details);
  const load = useSelector((state) => state.detail.loading);
  const [mode, setMode] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  let dispatch = useDispatch();

  const [id, setId] = useState("");
  const handleDelete = (_id) => {
    setId(_id);
    setDialog(true);
    handleOpenDialog();
  };

  const editModal = async (_id) => {
    await dispatch(getSinglePeople(_id));
    setMode("edit");
  };
  const handleOpen = () => setMode("add");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detail.map(
                ({ _id, fname, lname, email, gender, address, phone }) => (
                  <TableRow
                    key={_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {fname}
                    </TableCell>
                    <TableCell align="left">{lname}</TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{gender}</TableCell>
                    <TableCell align="left">{address}</TableCell>
                    <TableCell align="left">{phone}</TableCell>
                    <TableCell align="left">
                      <div className="icon">
                        <span className="delete__icon">
                          <DeleteIcon
                            color="error"
                            onClick={() => handleDelete(_id)}
                          />
                        </span>
                        <span className="edit__icon">
                          <EditIcon
                            color="success"
                            onClick={() => editModal(_id)}
                          />
                        </span>
                        {/* <span className="view__icon">
                          <VisibilityIcon style={{ color: "#3b5998" }} />
                        </span> */}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="dialog">
        {dialog ? (
          <DraggableDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleOpenDialog={handleOpenDialog}
            id={id}
          />
        ) : (
          ""
        )}
      </div>
      <div className="modal__add">
        <BasicModal
          open={mode === "add" || mode === "edit" ? true : false}
          handleOpen={handleOpen}
          // handleClose={handleClose}
          setMode={setMode}
          mode={mode}
        />
      </div>
      <div className="skeleton">{load ? <SkeletonColor /> : ""}</div>
    </>
  );
}

export default CommonTable;
