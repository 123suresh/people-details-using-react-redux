import { getItem } from "../components/utils/localStorage";
import * as types from "../constant/actionTypes";

const initialState = {
  details: [],
  detail: {},
  loading: false,
  //localStorage
  peopleList: [],
  toast: false,
};

const peopleInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PEOPLE_START:
      return {
        ...state,
        loading: true,
      };
    case types.CLEAR_DATA:
      return {
        ...state,
        ...initialState,
      };
    case types.GET_PEOPLE_SUCCESS:
      return {
        ...state,
        details: action.payload,
        loading: false,
      };
    case types.DELETE_PEOPLE:
      const newDetail = state.details.filter((el) => el._id !== action.payload);
      return {
        ...state,
        details: newDetail,
        loading: false,
      };

    case types.ADD_PEOPLE:
      return {
        ...state,
        details: action.payload,
        loading: false,
      };
    case types.GET_SINGLE_PEOPLE:
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };
    case types.UPDATE_PEOPLE:
      const index = state.details.findIndex(
        (el) => el._id === action.payload._id
      );
      state.details[index] = action.payload;
      return {
        ...state,
        details: [...state.details],
      };
    //localSrorage
    case types.GET_PEOPLE_LIST:
      return {
        ...state,
        peopleList: action.payload,
      };
    case types.ADD_PEOPLE_LIST:
      return {
        ...state,
        peopleList: [...state.peopleList, action.payload],
      };
    case types.DELETE_PEOPLE_LIST:
      const newPeopleList = state.peopleList.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        peopleList: newPeopleList,
      };
    case types.UPDATE_PEOPLE_LIST:
      const i = state.peopleList.findIndex((el) => el.id === action.payload.id);
      state.peopleList[i] = action.payload.data;
      return {
        ...state,
        peopleList: [...state.peopleList],
      };
    //for snackbar
    case types.OPEN_SNACKBAR:
      return {
        ...state,
        toast: true,
      };
    case types.CLOSE_SNACKBAR:
      return {
        ...state,
        toast: false,
      };
    //for sortings
    case types.PEOPLE_AFTER_SORTED:
      return {
        ...state,
        peopleList: action.payload,
      };
    default:
      return state;
  }
};

export default peopleInfo;
