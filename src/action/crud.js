import { deleteRequest, getSingleDetail, updateDetail } from "../services/crud";
import * as types from "../constant/actionTypes";
import { getRequest } from "../services/crud";
import { postRequest } from "../services/crud";
import { getItem } from "../utils/localStorage";
import {
  addPeople,
  delPeople,
  updatePeopleData,
} from "../services/localStorageCrud";

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

//localStorage
const getPeopleList = (peopleList) => ({
  type: types.GET_PEOPLE_LIST,
  payload: peopleList,
});

const addPeopleLists = (peopleList) => ({
  type: types.ADD_PEOPLE_LIST,
  payload: peopleList,
});
const deleteSinglePeople = (id) => ({
  type: types.DELETE_PEOPLE_LIST,
  payload: id,
});
const updatePeopleLists = (updateData) => ({
  type: types.UPDATE_PEOPLE_LIST,
  payload: updateData,
});

//for global snackbar
const openSnackBar = (note) => ({
  type: types.OPEN_SNACKBAR,
  payload: note,
});
const closeToast = () => ({
  type: types.CLOSE_SNACKBAR,
});

//for sorting
const peopleAfterSorted = (people) => ({
  type: types.PEOPLE_AFTER_SORTED,
  payload: people,
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

//for localStorage
export const getPeopleLists = () => (dispatch) => {
  dispatch(getPeopleList(getItem()));
};

export const addSinglePeople = (people) => (dispatch) => {
  const peopleValue = addPeople(people);
  if (peopleValue) {
    dispatch(addPeopleLists(peopleValue));
    dispatch(openSnackBar("people added successfully"));
    return true;
  }
};

export const deletePeopleList = (id) => async (dispatch) => {
  try {
    await dispatch(deleteSinglePeople(delPeople(id)));
    dispatch(openSnackBar("deleted successfully"));
  } catch (error) {
    console.log(error);
  }
};

export const updatePeopleList = (data, peopleId) => (dispatch) => {
  const updatedPeople = updatePeopleData(data, peopleId);
  if (updatedPeople) {
    dispatch(updatePeopleLists(updatedPeople));
    dispatch(openSnackBar("people updated successfully"));
    return true;
  }
};

export const closeSnackBar = () => (dispatch) => {
  dispatch(closeToast());
};

//for sorting
export const sortingPeople = (people) => (dispatch) => {
  dispatch(peopleAfterSorted(people));
};
