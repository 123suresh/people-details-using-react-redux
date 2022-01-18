import axios from "axios";
import getRequest from "../services/getRequest";
import * as types from "./actionTypes";

const getPeople = (peopleData) => ({
  type: types.GET_PEOPLES,
  payload: peopleData,
});

export const loadPeopleDetail = () => {
  // const accessToken = localStorage.getItem("token");
  return function (dispatch) {
    // axios
    //   .get(`${process.env.REACT_APP_API}/people`, {
    //     headers: {
    //       "X-Auth-Token": accessToken,
    //     },
    //   })
    getRequest()
      .then((resp) => {
        console.log("response fromn ation", resp.data.data);
        dispatch(getPeople(resp.data.data));
      })
      .catch((error) => console.log(error));
  };
};
