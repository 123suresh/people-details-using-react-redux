import { ButtonGroup, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import BasicModal from "../common/Modal";

function People({ detail }) {
  const [mode, setMode] = useState("");
  const { _id, fname, lname, email, gender, address, phone } = detail;
  return (
    <div>
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
            {/* <CommonButton
              buttonName="delete"
              onClick={() => handleDelete(_id)}
              size="small"
              color="error"
            /> */}
            <CommonButton
              buttonName="edit"
              size="small"
              onClick={() => setMode("edit")}
            />
          </ButtonGroup>
        </TableCell>
      </TableRow>
      {mode === "edit" ? (
        <BasicModal
          detail={detail}
          mode={mode}
          setMode={setMode}
          open={mode === "edit" ? true : false}
        />
      ) : null}
    </div>
  );
}

export default People;
