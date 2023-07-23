import {
  GET_USER,
  GET_USERS,
  USER_DELETED,
  USER_ERROR,
  CLEAR_USER,
  USER_CREATED,
} from "../actions/types";

const initialState = {
  users: {},
  user: null,
  loading: true,
  error: {},
};
export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case USER_DELETED:
    case USER_CREATED:
      return {
        state,
      };
    default:
      return state;
  }
}
