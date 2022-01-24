import { deleteRequest, getSingleDetail, updateDetail } from "../services/crud";
import * as types from "../constant/actionTypes";
import { getRequest } from "../services/crud";
import { postRequest } from "../services/crud";

const getStart = () => ({
  type: types.GET_PEOPLE_START,
});
const getPeople = (peopleData) => ({
  type: types.GET_PEOPLE_SUCCESS,
  payload: peopleData,
});

const deletePeople = (_id) => ({
  type: types.DELETE_PEOPLE,
  payload: _id,
});

const postPeople = () => ({
  type: types.ADD_PEOPLE,
});

const singlePeople = (singleData) => ({
  type: types.GET_SINGLE_PEOPLE,
  payload: singleData,
});

const updatedPeople = (updatedDetail) => ({
  type: types.UPDATE_PEOPLE,
  payload: updatedDetail,
});

export const deletePeopleDetail = (_id) => async (dispatch) => {
  try {
    await deleteRequest(_id);
    dispatch(deletePeople(_id));
  } catch (error) {
    console.log(error);
  }
};

export const loadPeopleDetail = () => async (dispatch) => {
  try {
    const response = await getRequest();
    dispatch(getPeople(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const postPeopleDetail = (data) => async (dispatch) => {
  try {
    await postRequest(data);
    dispatch(postPeople());
    dispatch(loadPeopleDetail());
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePeople = (_id) => async (dispatch) => {
  try {
    const response = await getSingleDetail(_id);
    dispatch(singlePeople(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const updatePeople = (singleDetail, _id) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await updateDetail(singleDetail, _id);
    dispatch(updatedPeople(data));
  } catch (error) {
    console.log(error);
  }
};

export const getStartLoad = () => {
  return function (dispatch) {
    dispatch(getStart());
  };
};
