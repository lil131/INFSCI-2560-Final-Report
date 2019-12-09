import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
}

// User loading
export function setUserLoading() {
  return {
    type: USER_LOADING
  };
};

// Register User
export const registerUser = (userData) => dispatch => {
  console.log("Enter register user");
  userData.username = userData.username.toLowerCase()
  axios
    .post("/api/users", userData)
    .then(res => {
      console.log(res);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "Oops"//err.response.data
      })
    );
};

/**
* @desc Login - get user token
*/
export const loginUser = userData => dispatch => {
  console.log("Enter login user");
  userData.username = userData.username.toLowerCase()
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token, nickname, permission } = res.data;
      // localStorage.setItem("jwtToken", token);
      // console.log("localStorage token: "+ localStorage.getItem("jwtToken"));
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      decoded['nickname'] = nickname;
      decoded['permission'] = permission;
      // Set current user // TODO??
      dispatch(setCurrentUser(decoded));
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      alert("Something wrong. Please check your account and password.")
    });
};

// Log user out
export const logoutUser = () => dispatch => {
  console.log("LOGOUT!");
  // Remove token from local storage
  // localStorage.removeItem("jwtToken");
  localStorage.removeItem("currentUser");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
