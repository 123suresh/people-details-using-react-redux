import axios from "axios";
const accessToken = localStorage.getItem("token");
function deleteRequest(_id) {
  const deteleDetail = axios.delete(
    `${process.env.REACT_APP_API}/people/${_id}`,
    {
      headers: {
        "X-Auth-Token": accessToken,
      },
    }
  );
  return deteleDetail;
}

export default deleteRequest;
