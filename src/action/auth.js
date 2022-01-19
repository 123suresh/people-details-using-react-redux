import * as types from "../constant/actionTypes";
export const auth = (data) => (dispatch) => {
  dispatch({
    type: types.IS_AUTH,
    payload: data,
  });
};

export const authLogout = (data) => (dispatch) => {
  dispatch({
    type: types.AUTH_LOGOUT,
    payload: data,
  });
};
