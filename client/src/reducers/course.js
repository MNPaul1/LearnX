import { COURSE_ERROR, GET_COURSES_BY_BOOTCAMP } from "../actions/types";
const initialState = {
  courses: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COURSES_BY_BOOTCAMP:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
