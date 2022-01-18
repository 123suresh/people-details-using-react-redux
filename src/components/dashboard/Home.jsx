import { useEffect, useState } from "react";
import ResponsiveAppBar from "../headers/Navbar";
import CommonButton from "../common/CommonButton";
import "./Home.scss";
import BasicModal from "../common/Modal";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { loadPeopleDetail } from "../action/peopleDetail";
import { ButtonGroup } from "@mui/material";
import { deletePeopleDetail } from "../action/deletePeople";

function Home() {
  const detail = useSelector((state) => state.detail.details);
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(loadPeopleDetail());
  }, []);

  const handleDelete = (_id) => {
    dispatch(deletePeopleDetail(_id));
    // dispatch();
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="add__button">
        <CommonButton buttonName="add" onClick={handleOpen} />
      </div>
      <div className="modal">
        <BasicModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
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
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <CommonButton
                          buttonName="delete"
                          onClick={() => handleDelete(_id)}
                          size="small"
                          color="error"
                        />
                        <CommonButton buttonName="edit" size="small" />
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Home;
