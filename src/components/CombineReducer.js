import React from "react";
import { combineReducers } from "redux";
import Auth from "./reducers/auth";
import peopleDetail from "./reducers/people";

const rootReducer = combineReducers({
  auth: Auth,
  detail: peopleDetail,
});

export default rootReducer;
