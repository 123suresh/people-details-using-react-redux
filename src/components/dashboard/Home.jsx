import { useEffect, useState } from "react";
import ResponsiveAppBar from "../header/Navbar";
import CommonButton from "../common/CommonButton";
import "./Home.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePeople, loadPeopleDetail } from "../../action/crud";
import { ButtonGroup } from "@mui/material";
import BasicReuseModal from "../common/Modal";
import DraggableDialog from "../common/Dialog";
import BasicModal from "../common/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Home() {
  const detail = useSelector((state) => state.detail.details);
  // const singleDetail = useSelector((state) => state.detail.detail);
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState(null);
  // const [add, setAdd] = useState("add");
  // const [edit, setEdit] = useState("edit");

  const [id, setId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => setMode("add");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(loadPeopleDetail());
  }, []);

  const handleDelete = (_id) => {
    setId(_id);
    setDialog(true);
    handleOpenDialog();
    // dispatch(deletePeopleDetail(_id));
  };

  const editModal = async (_id) => {
    await dispatch(getSinglePeople(_id));
    setMode("edit");
    // setOpen(true);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="add__button">
        <CommonButton buttonName="add" onClick={() => handleOpen()} />
      </div>
      {/* <div className="modal">
        <BasicModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div> */}
      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detail.map(
                ({ _id, fname, lname, email, gender, address, phone }) => (
                  <TableRow
                    key={_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {fname}
                    </TableCell>
                    <TableCell align="center">{lname}</TableCell>
                    <TableCell align="center">{email}</TableCell>
                    <TableCell align="center">{gender}</TableCell>
                    <TableCell align="center">{address}</TableCell>
                    <TableCell align="center">{phone}</TableCell>
                    <TableCell align="center">
                      <div className="icon">
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDelete(_id)}
                        />

                        <EditIcon
                          color="success"
                          onClick={() => editModal(_id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="modal__add">
        {mode === "add" ? (
          <BasicModal
            open
            handleOpen={handleOpen}
            // handleClose={handleClose}
            setMode={setMode}
            mode={mode}
          />
        ) : null}
      </div>
      <div className="modal__edit">
        {/* {openModalonEdit ? ( */}
        {mode === "edit" ? (
          <BasicModal
            open
            handleOpen={handleOpen}
            // handleClose={handleClose}
            setMode={setMode}
            mode={mode}
          />
        ) : null}
        {/* ) : (
          ""
        )} */}
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
    </div>
  );
}

export default Home;
