const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem("token") ? "true" : "",
};
localStorage.getItem("token");
function Auth(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case "isAuth":
      payload
        ? localStorage.setItem("token", payload)
        : localStorage.removeItem("token");
      return { ...state, isAuthenticated: payload };
    default:
      return state;
  }
}

export default Auth;
