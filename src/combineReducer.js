import React from "react";
import { combineReducers } from "redux";
import Auth from "./reducer/auth";
import peopleDetail from "./reducer/people";

const rootReducer = combineReducers({
  auth: Auth,
  detail: peopleDetail,
});

export default rootReducer;
