import React from "react";
import { combineReducers } from "redux";
import Auth from "./reducer/auth";
import peopleInfo from "./reducer/people";

const rootReducer = combineReducers({
  auth: Auth,
  info: peopleInfo,
});

export default rootReducer;
