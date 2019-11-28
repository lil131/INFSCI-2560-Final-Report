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
            "content": [
                "1111-1",
                "1111-2"
            ],
            "questionSets": [
                [
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44df3b481159f4c0757b",
                        "statement": "ch1-qs1-1",
                        "correctAnswer": 2
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44df3b481159f4c0757a",
                        "statement": "ch1-qs1-2",
                        "correctAnswer": 0
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44df3b481159f4c07579",
                        "statement": "ch1-qs1-3",
                        "correctAnswer": 1
                    }
                ],
                [
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44df3b481159f4c0757e",
                        "statement": "ch1-qs2-1",
                        "correctAnswer": 0
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44df3b481159f4c0757d",
                        "statement": "ch1-qs2-2",
                        "correctAnswer": 3
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44df3b481159f4c0757c",
                        "statement": "ch1-qs2-3",
                        "correctAnswer": 2
                    }
                ]
            ],
            "id": 0,
            "title": "c1",
            "__v": 0
        },
        {
            "content": [
                "2222-1",
                "2222-2"
            ],
            "questionSets": [
                [
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44ef3b481159f4c07581",
                        "statement": "ch1-qs1-1",
                        "correctAnswer": 2
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44ef3b481159f4c07580",
                        "statement": "ch1-qs1-2",
                        "correctAnswer": 0
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44ef3b481159f4c0757f",
                        "statement": "ch1-qs1-3",
                        "correctAnswer": 1
                    }
                ],
                [
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44ef3b481159f4c07584",
                        "statement": "ch1-qs2-1",
                        "correctAnswer": 0
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44ef3b481159f4c07583",
                        "statement": "ch1-qs2-2",
                        "correctAnswer": 3
                    },
                    {
                        "options": [
                            "aa",
                            "bb",
                            "cc",
                            "dd"
                        ],
                        "_id": "5ddf44ef3b481159f4c07582",
                        "statement": "ch1-qs2-3",
                        "correctAnswer": 2
                    }
                ]
            ],
            "id": 1,
            "title": "c2",
            "__v": 0
        }
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
