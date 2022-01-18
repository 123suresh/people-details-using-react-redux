import axios from "axios";
const accessToken = localStorage.getItem("token");

function postRequest(data) {
  const postDetail = axios.post(`${process.env.REACT_APP_API}/people`, data, {
    headers: {
      "X-Auth-Token": accessToken,
    },
  });
  return postDetail;
}

export default postRequest;
