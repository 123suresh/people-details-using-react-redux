import * as types from "../constant/actionTypes";

const initialState = {
  details: [],
  detail: {},
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
      const newDetail = state.details.filter((el) => el._id !== action.payload);
      return {
        ...state,
        details: newDetail,
        loading: false,
      };

    case types.ADD_PEOPLE:
      return {
        ...state,
        // details: action.payload,
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
      // const updatedPeopleDetail = state.details.map((el) => {
      //   if (el._id === action.payload._id) {
      //     return { ...el, details: action.payload.singleDetail };
      //   }
      //   return el;
      // });
      return {
        ...state,
        details: [...state.details],
      };
    default:
      return state;
  }
};

export default peopleDetail;
