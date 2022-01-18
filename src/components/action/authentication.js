export const auth = (data) => (dispatch) => {
  dispatch({
    type: "isAuth",
    payload: data,
  });
};

export const authLogout = (data) => (dispatch) => {
  dispatch({
    type: "authLogout",
    payload: data,
  });
};