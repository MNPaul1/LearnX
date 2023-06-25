import {
  COURSE_ERROR,
  GET_COURSES,
  GET_COURSES_BY_BOOTCAMP,
  CLEAR_COURSE,
  GET_COURSE,
} from "../actions/types";
const initialState = {
  current_course: null,
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
    case GET_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        current_course: payload,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_COURSE:
      return {
        ...state,
        current_course: null,
        courses: [],
        loading: false,
      };
    default:
      return state;
  }
}
