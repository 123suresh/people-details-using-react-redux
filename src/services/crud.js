import axios from "axios";
const accessToken = localStorage.getItem("token");
export const deleteRequest = (_id) => {
  const deteleDetail = axios.delete(
    `${process.env.REACT_APP_API}/people/${_id}`,
    {
      headers: {
        "X-Auth-Token": accessToken,
      },
    }
  );
  return deteleDetail;
};

export const getRequest = () => {
  const getDetail = axios.get(`${process.env.REACT_APP_API}/people`, {
    headers: {
      "X-Auth-Token": accessToken,
    },
  });
  return getDetail;
};

export const postRequest = (data) => {
  const postDetail = axios.post(`${process.env.REACT_APP_API}/people`, data, {
    headers: {
      "X-Auth-Token": accessToken,
    },
  });
  return postDetail;
};

export const getSingleDetail = (_id) => {
  const singleDetail = axios.get(`${process.env.REACT_APP_API}/people/${_id}`, {
    headers: {
      "X-Auth-Token": accessToken,
    },
  });
  return singleDetail;
};

export const updateDetail = (singleDetail, _id) => {
  const updateData = axios.put(
    `${process.env.REACT_APP_API}/people/${_id}`,
    singleDetail,
    {
      headers: {
        "X-Auth-Token": accessToken,
      },
    }
  );
  return updateData;
};
