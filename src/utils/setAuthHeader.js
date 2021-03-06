import axios from "axios";

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers = {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      Authorization: `Bearer ${token}`,
      //   Authorization: "Bearer " + token,
    };
  } else {
    delete axios.defaults.headers.Authorization;
  }
};

export default setAuthHeader;
