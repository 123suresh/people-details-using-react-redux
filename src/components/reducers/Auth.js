export const auth = (data) => (dispatch) => {
  dispatch({
    type: "isAuth",
    payload: data,
  });
};

export const authOnRefresh = (data) => (dispatch) => {
  dispatch({
    type: "authOnRefresh",
    payload: data,
  });
};

export const authLogout = (data) => (dispatch) => {
  dispatch({
    type: "authLogout",
    payload: data,
  });
};

const INITIAL_STATE = {
  isAuthenticated: false,
};
function Auth(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case "isAuth":
      payload
        ? localStorage.setItem("token", "redux token")
        : localStorage.removeItem("token");
      return { ...state, isAuthenticated: payload };
    case "authOnRefresh":
      payload
        ? localStorage.setItem("token", "redux token")
        : localStorage.removeItem("token");
      return { ...state, isAuthenticated: payload };
    default:
      return state;
  }
}

export default Auth;
