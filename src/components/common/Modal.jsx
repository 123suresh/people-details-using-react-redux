import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "./InputField";
import CommonButton from "./CommonButton";
import "./Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { postPeopleDetail, updatePeople } from "../../action/crud";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SimpleSnackbar from "./SnackBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const selectGender = [
  {
    value: "male",
    label: "male",
  },
  {
    value: "female",
    label: "female",
  },
];

export default function BasicModal({ handleOpen, open, setMode, mode }) {
  const singleDetail = useSelector((state) => state.detail.detail);
  const dispatch = useDispatch();
  const [fname, setFname] = useState(mode === "add" ? "" : singleDetail.fname);
  const [lname, setLname] = useState(mode === "add" ? "" : singleDetail.lname);
  const [email, setEmail] = useState(mode === "add" ? "" : singleDetail.email);
  const [gender, setGender] = useState(
    mode === "add" ? "male" : singleDetail.gender
  );
  const [address, setAddress] = useState(
    mode === "add" ? "" : singleDetail.address
  );
  const [phone, setPhone] = useState(mode === "add" ? "" : singleDetail.phone);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClose = () => {
    clearFormData();
    setMode(null);
  };
  const clearFormData = () => {
    setFname("");
    setLname("");
    setEmail("");
    setAddress("");
    setPhone("");
  };

  const handleChangeGender = (event) => {
    event.preventDefault();
    setGender(event.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const data = { fname, lname, email, gender, address, phone };
    dispatch(postPeopleDetail(data));
    clearFormData();
    handleClose();
    setOpenSnackBar(true);
  };

  //   useEffect(() => {
  //     if (singleDetail && mode === "edit") {

  //       setFname(singleDetail.fname);
  //       setLname(singleDetail.lname);
  //       setEmail(singleDetail.email);
  //       setGender(singleDetail.gender);
  //       setAddress(singleDetail.address);
  //       setPhone(singleDetail.phone);
  //     } else {
  //       clearFormData();
  //     }
  //   }, [singleDetail]);

  const handleEdit = () => {
    const data = { fname, lname, email, gender, address, phone };
    dispatch(updatePeople(data, singleDetail._id));
    setFname("");
    setLname("");
    setEmail("");
    setAddress("");
    setPhone("");
    handleClose();
    setOpenSnackBar(true);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add People Detils
          </Typography>
          <InputField
            label="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <br />
          <InputField
            label="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <br />
          <InputField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            id="filled-select-currency"
            select
            label="Gender"
            value={gender}
            onChange={handleChangeGender}
            variant="filled"
            size="small"
          >
            {selectGender.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <br />
          <InputField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <InputField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="modal_button">
            <CommonButton
              buttonName="cancel"
              onClick={handleClose}
              size="small"
              color="error"
            />
            <CommonButton
              buttonName="Confirm"
              onClick={mode === "add" ? handleAdd : handleEdit}
              color="success"
              size="small"
              disabled={
                !fname || !lname || !email || !gender || !address || !phone
              }
            />
          </div>
        </Box>
      </Modal>
      <div className="snack__bar">
        {openSnackBar ? (
          <SimpleSnackbar
            setOpenSnackBar={setOpenSnackBar}
            openSnackBar={openSnackBar}
            note={
              mode === "add"
                ? "Detail added successfully"
                : "Detail edited successfully"
            }
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
