import { useEffect, useState } from "react";
import ResponsiveAppBar from "../header/Navbar";
import CommonButton from "../common/CommonButton";
import "./PeopleList.scss";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPeopleLists,
  getSinglePeople,
  loadPeopleDetail,
  repeatedValueValidation,
  sortingPeople,
} from "../../action/crud";
import BasicModal from "../common/Modal";
import { getStartLoad } from "../../action/crud";
import { CLEAR_DATA } from "../../constant/actionTypes";

//table for localStorage
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { deleteDetail } from "../utils/localStorageCrud";
// import { getItem } from "../utils/localStorage";
import People from "./People";
import BasicPagination from "../common/Pagination";
import InputField from "../common/InputField";
import SearchIcon from "@mui/icons-material/Search";

//mui table pagination
import TablePagination from "@mui/material/TablePagination";

//for sorting
import TableSortLabel from "@mui/material/TableSortLabel";
import { sortPeopleAsc, sortPeopleDesc } from "../../utils/sorting";
import { search } from "../../utils/search";
import SnackBar from "../common/SnackBar";

function PeopleList() {
  const people = useSelector((state) => state.info.peopleList);
  const snackBar = useSelector((state) => state.info.toast);
  let dispatch = useDispatch();
  const [mode, setMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //for sorting
  const [order, setOrder] = useState("ASC");
  const [orderBy, setOrderBy] = useState(null);

  //mui table pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleSortRequest = (id) => {
  //   const isAsc = orderBy === id && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(id);
  // };

  // function stableSort(array, comparator) {
  //   const stabilizedThis = array.map((el, index) => [el, index]);
  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) return order;
  //     return a[1] - b[1];
  //   });
  //   return stabilizedThis.map((el) => el[0]);
  // }
  // function getComparator(order, orderBy) {
  //   return order === "desc"
  //     ? (a, b) => descendingComparator(a, b, orderBy)
  //     : (a, b) => -descendingComparator(a, b, orderBy);
  // }
  // function descendingComparator(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }
  // for localStorage getting peopleList
  useEffect(() => {
    dispatch(getPeopleLists());
    return () => {
      dispatch({ type: CLEAR_DATA });
    };
  }, []);

  //for sorting
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = sortPeopleAsc(people, col);
      setOrder("DESC");
      dispatch(sortingPeople(sorted));
      setOrderBy(true);
    }
    if (order === "DESC") {
      const sorted = sortPeopleDesc(people, col);
      setOrder("ASC");
      dispatch(sortingPeople(sorted));
      setOrderBy(false);
    }
  };

  const peopleAfterPaging = () => {
    const searchedPeople = search(people, searchTerm);
    return searchedPeople.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  //for localStorage
  // const [userDetails, setUserDetails] = useState(detail);
  // const handleOpenAdd = () => setMode("add");
  // const handleOpenEdit = () => setMode("edit");

  // useEffect(() => {
  //   dispatch(getStartLoad());
  //   dispatch(loadPeopleDetail());
  //   return () => {
  //     dispatch({ type: CLEAR_DATA });
  //   };
  // }, []);

  // const handleDel = async (index) => {
  //   await deleteDetail(index);
  //   setUserDetails(detail);
  // };

  return (
    <>
      <ResponsiveAppBar />
      <div className="add__button">
        <CommonButton buttonName="add" onClick={() => setMode("add")} />
      </div>
      <div className="search">
        <SearchIcon color="primary" fontSize="large" />
        <InputField
          id="search__input"
          label="Search ...."
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="modal__add">
        <BasicModal
          // open={mode === "add" || mode === "edit" ? true : false}
          open={mode === "add" ? true : false}
          // handleOpen={handleOpen}
          setMode={setMode}
          mode={mode}
          //for localStorage
        />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <TableSortLabel
                    direction={orderBy === true ? "desc" : "asc"}
                    onClick={() => sorting("fname")}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>

                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={orderBy === true ? "desc" : "asc"}
                    onClick={() => sorting("lname")}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={orderBy === true ? "desc" : "asc"}
                    onClick={() => sorting("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {peopleAfterPaging().map((people) => {
                return (
                  // <React.Fragment key={people.id}>
                  <People people={people} key={people.id} />
                  // </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={people.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      {snackBar.display ? <SnackBar /> : null}
    </>
  );
}

export default PeopleList;
