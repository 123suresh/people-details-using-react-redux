import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "./InputField";
import CommonButton from "./CommonButton";
import "./Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { emailValidationCheck, maxLengthCheck } from "../../utils/maxLength";
import { emailRegex, onlyTextRegex } from "../../utils/regex";
import { addSinglePeople, updatePeopleList } from "../../action/crud";
import DraggableDialog from "./Dialog";
import { emailPhoneValidation } from "../../services/localStorageCrud";
import { getItem } from "../../utils/localStorage";
import {
  checkUniqueEmail,
  checkUniquePhoneNum,
} from "../../utils/emailPhoneValidate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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

export default function FormModal({ handleOpen, open, setMode, mode, people }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  // const singleDetail = useSelector((state) => state.detail.detail);
  const dispatch = useDispatch();
  const [phoneLenErr, setPhoneLenErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [uniqueValueErr, SetUniqueValueErr] = useState(false);
  const [dialogForExistValue, setDialogForExistValue] = useState(false);
  // const [err, setErr] = useState({ email: false, phone: false });
  // const [fname, setFname] = useState(mode === "add" ? "" : singleDetail.fname);
  // const [lname, setLname] = useState(mode === "add" ? "" : singleDetail.lname);
  // const [email, setEmail] = useState(mode === "add" ? "" : singleDetail.email);
  // const [gender, setGender] = useState(
  //   mode === "add" ? "male" : singleDetail.gender
  // );
  // const [address, setAddress] = useState(
  //   mode === "add" ? "" : singleDetail.address
  // );
  // const [phone, setPhone] = useState(mode === "add" ? "" : singleDetail.phone);
  const [buttonDisable, setButtonDisable] = useState(false);
  // const [detail, setDetail] = useState(getLocalItem());

  const handleClose = () => {
    clearFormData();
    setMode(null);
    setEmailErr(false);
  };
  const closeDialogInModal = () => {
    setDialogForExistValue(false);
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
    if (emailRegex.test(email)) {
      const existedValueCheck = emailPhoneValidation(data);
      if (existedValueCheck) {
        dispatch(addSinglePeople(data));
        //dispatch({type:OPEN_SNACKBAR,payload:{display:true,msg:'added'}})
        handleClose();
        setEmailErr(false);
      } else {
        setDialogForExistValue(true);
      }
    } else {
      setEmailErr(true);
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setFname(people.fname);
      setLname(people.lname);
      setEmail(people.email);
      setGender(people.gender);
      setAddress(people.address);
      setPhone(people.phone);
    } else {
      clearFormData();
    }
  }, [people, mode]);

  //useEffect for people detail api
  // useEffect(() => {
  //   if (singleDetail && mode === "edit") {
  //     setFname(singleDetail.fname);
  //     setLname(singleDetail.lname);
  //     setEmail(singleDetail.email);
  //     setGender(singleDetail.gender);
  //     setAddress(singleDetail.address);
  //     setPhone(singleDetail.phone);
  //   } else {
  //     clearFormData();
  //   }
  // }, [singleDetail, mode]);

  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   setButtonDisable(true);
  //   const data = { fname, lname, email, gender, address, phone };
  //   phone.length < 10
  //     ? setPhoneLenErr(true)
  //     : await dispatch(updatePeople(data, singleDetail._id));
  //   phone.length < 10 ? setPhoneLenErr(true) : setFname("");
  //   phone.length < 10 ? setPhoneLenErr(true) : setLname("");
  //   phone.length < 10 ? setPhoneLenErr(true) : setEmail("");
  //   phone.length < 10 ? setPhoneLenErr(true) : setAddress("");
  //   phone.length < 10 ? setPhoneLenErr(true) : setPhone("");
  //   phone.length < 10 ? setPhoneLenErr(true) : handleClose();
  //   setButtonDisable(false);
  //   phone.length < 10 ? setPhoneLenErr(true) : setOpenSnackBar(true);
  // };

  // const emailValidate = (e) => {
  //   const { value } = e.target;
  //   if (emailRegex.text(value)) {
  //     setEmail(value);
  //   }
  // };

  const numValidate = (e) => {
    const { value } = e.target;
    let maxLength = 11;
    if (maxLengthCheck(value, maxLength)) {
      setPhone(value);
    }
  };

  const onlyText = (e) => {
    const { value } = e.target;
    if (onlyTextRegex.test(value)) {
      setFname(value);
    }
  };
  const onlyTextLname = (e) => {
    const { value } = e.target;
    if (onlyTextRegex.test(value)) {
      setLname(value);
    }
  };

  const handleEmail = (e) => {
    setEmailErr(false);
    setEmail(e.target.value);
  };

  //for edit in localStorage
  const handleEdit = (e) => {
    e.preventDefault();
    const data = { fname, lname, email, gender, address, phone };
    if (emailRegex.test(email)) {
      const email = checkUniqueEmail(data);
      const phone = checkUniquePhoneNum(data);
      const peopleList = getItem();
      const index = peopleList.findIndex((el) => el.id === people.id);
      if (
        peopleList[index].email !== data.email &&
        peopleList[index].phone !== data.phone
      ) {
        if (email === -1 && phone === -1) {
          dispatch(updatePeopleList(data, people.id));
          handleClose();
          setEmailErr(false);
        } else {
          setDialogForExistValue(true);
        }
      } else if (
        peopleList[index].email !== data.email ||
        peopleList[index].phone !== data.phone
      ) {
        if (email === -1 || phone === -1) {
          dispatch(updatePeopleList(data, people.id));
          handleClose();
          setEmailErr(false);
        } else {
          setDialogForExistValue(true);
        }
      } else {
        if (
          email === -1 ||
          phone === -1 ||
          peopleList[index].fname !== data.fname ||
          peopleList[index].lname !== data.lname ||
          peopleList[index].gender !== data.gender ||
          peopleList[index].address !== data.address
        ) {
          dispatch(updatePeopleList(data, people.id));
          handleClose();
          setEmailErr(false);
        } else {
          setDialogForExistValue(true);
        }
      }
    } else {
      setEmailErr(true);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal__header">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {mode === "add" ? "Add" : "Edit"} People Details
            </Typography>
          </div>
          <InputField
            label="First Name"
            value={fname || ""}
            // onChange={(e) => setFname(e.target.value)}
            onChange={onlyText}
          />
          <br />
          <InputField
            label="Last Name"
            value={lname || ""}
            // onChange={(e) => setLname(e.target.value)}
            onChange={onlyTextLname}
          />
          <br />
          <InputField
            label="Email"
            value={email || ""}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleEmail}
            error={emailErr === true ? true : null}
          />
          <br />
          <TextField
            id="filled-select-currency"
            select
            label="Gender"
            value={gender || ""}
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
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <InputField
            label="Phone Number"
            value={phone || ""}
            // onChange={(e) => setPhone(e.target.value)}
            onChange={numValidate}
            error={phoneLenErr ? true : false}
          />

          <div className="modal_button">
            <div className="cancel__button">
              <CommonButton
                buttonName="cancel"
                onClick={handleClose}
                size="small"
                color="error"
              />
            </div>
            <div className="confirm__button">
              <CommonButton
                buttonName="Confirm"
                onClick={mode === "add" ? handleAdd : handleEdit}
                color="success"
                size="small"
                disabled={
                  !fname ||
                  !lname ||
                  !email ||
                  !gender ||
                  !address ||
                  !phone ||
                  buttonDisable
                }
              />
            </div>
          </div>
        </Box>
      </Modal>
      {dialogForExistValue ? (
        <DraggableDialog
          dialogForExistValue={dialogForExistValue}
          setDialogForExistValue={setDialogForExistValue}
          closeDialogInModal={closeDialogInModal}
        />
      ) : null}
    </>
  );
}
