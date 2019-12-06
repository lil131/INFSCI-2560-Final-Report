import {
  GET_API_SUCCESS,
  CREATE_API_SUCCESS,
  EDIT_API_SUCCESS,
  DELETE_API_SUCCESS,
  GET_API_DETAIL_SUCCESS
} from "../actions/types";

const initialState = {
  chapters: []
};

export default function fetch(state = initialState, action) {
  console.log('enter fetch reducer: ' + JSON.stringify(action));
  switch (action.type) {
    case GET_API_SUCCESS:
      return {
        chapters: action.chapters
      };
    case CREATE_API_SUCCESS:
      return {
        ...state,
        ...action.chapter
      };
    default:
      return state;
  }
}
