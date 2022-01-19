import { deleteRequest, getSingleDetail, updateDetail } from "../services/crud";
import * as types from "../constant/actionTypes";
import { getRequest } from "../services/crud";
import { postRequest } from "../services/crud";
import axios from "axios";

const deletePeople = (_id) => ({
  type: types.DELETE_PEOPLE,
  payload: _id,
});

const getPeople = (peopleData) => ({
  type: types.GET_PEOPLES,
  payload: peopleData,
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

export const deletePeopleDetail = (_id) => {
  return function (dispatch) {
    deleteRequest(_id)
      .then((resp) => {
        dispatch(deletePeople(_id));
      })
      .catch((error) => console.log(error));
  };
};

export const loadPeopleDetail = () => {
  return function (dispatch) {
    getRequest()
      .then((resp) => {
        dispatch(getPeople(resp.data.data));
      })
      .catch((error) => console.log(error));
  };
};

export const postPeopleDetail = (data) => {
  return function (dispatch) {
    postRequest(data)
      .then((resp) => {
        dispatch(postPeople());
        dispatch(loadPeopleDetail());
      })
      .catch((error) => console.log(error));
  };
};

export const getSinglePeople = (_id) => {
  return function (dispatch) {
    getSingleDetail(_id)
      .then((resp) => {
        dispatch(singlePeople(resp.data.data));
      })
      .catch((error) => console.log(error));
  };
};

export const updatePeople = (singleDetail, _id) => {
  return function (dispatch) {
    updateDetail(singleDetail, _id)
      .then((resp) => {
        dispatch(updatedPeople(resp));
      })
      .catch((error) => console.log(error));
  };
};
