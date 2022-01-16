const INITIAL_STATE = {
  isAuthenticated: false,
  user: [],
};
function Auth(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case "isAuth":
      payload
        ? localStorage.setItem("token", payload)
        : localStorage.removeItem("token");
      return { ...state, isAuthenticated: payload };
    case "authOnRefresh":
      payload
        ? localStorage.setItem("token", payload)
        : localStorage.removeItem("token");
      return { ...state, isAuthenticated: payload };
    default:
      return state;
  }
}

export default Auth;
