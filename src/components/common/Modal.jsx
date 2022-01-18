import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "./InputField";
import CommonButton from "./CommonButton";
import "./Modal.scss";
import { useDispatch } from "react-redux";
import { postPeopleDetail } from "../action/postPeople";

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

export default function BasicModal({ handleOpen, open, handleClose }) {
  const dispatch = useDispatch();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    const data = { fname, lname, email, gender, address, phone };
    e.preventDefault();
    dispatch(postPeopleDetail(data));
    setFname("");
    setLname("");
    setEmail("");
    setGender("");
    setAddress("");
    setPhone("");
    handleClose();
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
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
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
          <InputField
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
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
              onClick={handleSubmit}
              color="success"
              size="small"
            />
          </div>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
