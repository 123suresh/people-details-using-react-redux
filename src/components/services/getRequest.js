import axios from "axios";
const accessToken = localStorage.getItem("token");
function getRequest() {
  const getDetail = axios.get(`${process.env.REACT_APP_API}/people`, {
    headers: {
      "X-Auth-Token": accessToken,
    },
  });
  return getDetail;
}

export default getRequest;
