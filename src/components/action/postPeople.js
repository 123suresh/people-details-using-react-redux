import postRequest from "../services/postRequest";
import * as types from "./actionTypes";
import { loadPeopleDetail } from "./peopleDetail";

const postPeople = () => ({
  type: types.POST_PEOPLE,
  //   payload: postData,
});

export const postPeopleDetail = (data) => {
  //   const accessToken = localStorage.getItem("token");
  return function (dispatch) {
    // axios
    //   .post(`${process.env.REACT_APP_API}/people`, data, {
    //     headers: {
    //       "X-Auth-Token": accessToken,
    //     },
    //   })
    postRequest(data)
      .then((resp) => {
        dispatch(postPeople());
        dispatch(loadPeopleDetail());
      })
      .catch((error) => console.log(error));
  };
};
