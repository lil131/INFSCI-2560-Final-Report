import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import fetchReducer from "./fetchReducer";

export default combineReducers({
  auth: authReducer,
  fetch: fetchReducer,
  errors: errorReducer
});
