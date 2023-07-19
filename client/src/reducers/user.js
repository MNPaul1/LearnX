import { GET_USER, USER_ERROR } from "../actions/types";

const initialState = {
  users: {},
  loading: true,
  error: {},
};
export default function user(state = initialState, action){
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
