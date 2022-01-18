import * as types from "../action/actionTypes";

const initialState = {
  details: [],
  loading: false,
};

const peopleDetail = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PEOPLES:
      return {
        ...state,
        details: action.payload,
        loading: false,
      };
    case types.DELETE_PEOPLE:
      return {
        ...state,
        loading: false,
      };
    case types.POST_PEOPLE:
      //addpeople
      return {
        ...state,
        // details: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default peopleDetail;
