import axios from "axios";

const GET_PROJECT = "GET_PROJECT";

export function getProject() {
  return function (dispatch) {
    return axios({
      method: "get",
      baseURL: "http://localhost/3000",
      url: "/projects",
    }).then(({ data }) => {
      dispatch({
        type: GET_PROJECT,
        payload: data,
      });
    });
  };
}

const initialState = {
  projects: [],
};

export function projectReduce(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    default:
      return state;
  }
}
