import {
  GET_BOOTCAMP,
  BOOTCAMP_ERROR,
  GET_BOOTCAMPS,
  CLEAR_BOOTCAMP,
  BOOTCAMP_CREATED,
} from "../actions/types";
const initialState = {
  bootcamp: null,
  bootcamps: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOTCAMP:
    case BOOTCAMP_CREATED:
      return {
        ...state,
        bootcamp: payload,
        loading: false,
      };
    case BOOTCAMP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_BOOTCAMPS:
      return {
        ...state,
        bootcamps: payload,
        loading: false,
      };
    case CLEAR_BOOTCAMP:
      return {
        ...state,
        bootcamp: null,
        loading: false,
      };
    default:
      return state;
  }
}
