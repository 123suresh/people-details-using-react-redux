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

function Home() {
  let dispatch = useDispatch();
  const [mode, setMode] = useState(null);
  const handleOpen = () => setMode("add");

  useEffect(() => {
    dispatch(getStartLoad());
    dispatch(loadPeopleDetail());
    return () => {
      dispatch({ type: CLEAR_DATA });
    };
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <div className="add__button">
        <CommonButton buttonName="add" onClick={() => handleOpen()} />
      </div>

      <div className="modal__add">
        <BasicModal
          open={mode === "add" || mode === "edit" ? true : false}
          handleOpen={handleOpen}
          setMode={setMode}
          mode={mode}
        />
      </div>
      <div>
        <CommonTable />
      </div>
    </div>
  );
}

export default Home;
