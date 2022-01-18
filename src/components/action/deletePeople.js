import deleteRequest from "../services/deleteRequest";
import * as types from "./actionTypes";
import { loadPeopleDetail } from "./peopleDetail";

const deletePeople = () => ({
  type: types.DELETE_PEOPLE,
});

export const deletePeopleDetail = (_id) => {
  // const accessToken = localStorage.getItem("token");
  return function (dispatch) {
    // axios
    //   .delete(`${process.env.REACT_APP_API}/people/${_id}`, {
    //     headers: {
    //       "X-Auth-Token": accessToken,
    //     },
    //   })
    deleteRequest(_id)
      .then((resp) => {
        dispatch(deletePeople());
        dispatch(loadPeopleDetail());
      })
      .catch((error) => console.log(error));
  };
};
