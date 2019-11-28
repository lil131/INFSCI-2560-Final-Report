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
        chapters: [
          {
            id: 0,
            title: 'c1',
            content: ['1111-1','1111-2'],
            questionSets:[
              [{ // [ [{},{},{}] , [{},{},{}]] ,
                statement: 'ch1-qs1-1',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'C',
              }, {
                statement: 'ch1-qs1-2',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'D',
              }, {
                statement: 'ch1-qs1-3',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'D',
              }],
              [{
                statement: 'ch1-qs2-1',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'A',
              }, {
                statement: 'ch1-qs2-2',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'B',
              }, {
                statement: 'ch1-qs2-3',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'C',
              }]]},
          {
            id: 1,
            title: 'c2',
            content: ['2222-1','2222-2'],
            questionSets:[
              [{ // [ [{},{},{}] , [{},{},{}]] ,
                statement: 'ch1-qs1-1',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'C',
              }, {
                statement: 'ch1-qs1-2',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'A',
              }, {
                statement: 'ch1-qs1-3',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'B',
              }],
              [{
                statement: 'ch1-qs2-1',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'A',
              }, {
                statement: 'ch1-qs2-2',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'D',
              }, {
                statement: 'ch1-qs2-3',
                options: ['aa', 'bb', 'cc', 'dd'],
                correctAnswer: 'C',
              }]]}
        ]
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
