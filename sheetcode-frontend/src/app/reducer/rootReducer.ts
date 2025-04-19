import { combineReducers } from '@reduxjs/toolkit';
import codeReducer from "../../features/counter/codeSlice";
import authReducer from "../../features/counter/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: codeReducer,
});

export default rootReducer;
