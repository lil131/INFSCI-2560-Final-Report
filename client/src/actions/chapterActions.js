import axios from 'axios';
import { GET_API_SUCCESS, GET_ERRORS } from "./types";

export function setCurrentChapters(chapters) {
  console.log("setCurrentChapters");
  return {
    type: GET_API_SUCCESS,
    chapters
  };
}

// Fetch chapters
export const fetchChapters = () => dispatch => {
  console.log("Enter fetch chapters");
  axios
    .get("/api/chapters")
    .then(res => {
      console.log(res);
      const { chapters } = res.data;
      dispatch(setCurrentChapters(chapters));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "Oops"
      })
    );
};
