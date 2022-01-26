import { useEffect, useState } from "react";
import ResponsiveAppBar from "../header/Navbar";
import CommonButton from "../common/CommonButton";
import "./Home.scss";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePeople, loadPeopleDetail } from "../../action/crud";
import BasicModal from "../common/Modal";
import { getStartLoad } from "../../action/crud";
import { CLEAR_DATA } from "../../constant/actionTypes";
import CommonTable from "../common/Table";

//table for localStorage
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteDetail } from "../../services/localStorageCrud";
import TableReuse from "../common/TableReuse";
import { getItem } from "../utils/localStorage";

function Home() {
  const detail = getItem();
  let dispatch = useDispatch();
  const [mode, setMode] = useState(null);
  //for localStorage
  const [userDetails, setUserDetails] = useState(detail);
  const handleOpenAdd = () => setMode("add");
  const handleOpenEdit = () => setMode("edit");
  const [index, setIndex] = useState("");

  // useEffect(() => {
  //   dispatch(getStartLoad());
  //   dispatch(loadPeopleDetail());
  //   return () => {
  //     dispatch({ type: CLEAR_DATA });
  //   };
  // }, []);

  // const initialDetail = [];

  // useEffect(() =>
  //   detail
  //     ? null
  //     : localStorage.setItem("detail", JSON.stringify(initialDetail))
  // );

  const handleDel = async (index) => {
    await deleteDetail(index);
    setUserDetails(detail);
  };

  const handleEdit = (index) => {
    handleOpenEdit();
    setIndex(index);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="add__button">
        <CommonButton buttonName="add" onClick={() => handleOpenAdd()} />
      </div>

      <div className="modal__add">
        <BasicModal
          open={mode === "add" || mode === "edit" ? true : false}
          // handleOpen={handleOpen}
          setMode={setMode}
          mode={mode}
          //for localStorage
          index={index}
        />
      </div>
      {/* <div>
        <CommonTable />
      </div> */}
      {/* table for localStorage */}
      {/* {initialDetail ? ( */}
      <div>
        <h3>Table for LocalStorage</h3>
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
            {/* <TableReuse detail={detail} /> */}
            <TableBody>
              {detail.map(
                ({ fname, lname, email, gender, address, phone }, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
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
                        <CommonButton
                          buttonName="delete"
                          color="error"
                          size="small"
                          onClick={() => handleDel(index)}
                        />
                        <CommonButton
                          buttonName="edit"
                          size="small"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEdit(index);
                          }}
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
      {/* ) : null} */}
    </div>
  );
}

export default Home;
