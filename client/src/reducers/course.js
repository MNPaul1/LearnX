import {
  COURSE_ERROR,
  GET_COURSES,
  GET_COURSES_BY_BOOTCAMP,
  CLEAR_COURSE,
  GET_COURSE,
  COURSE_ADDED,
  COURSE_ADDED_ERROR,
  COURSE_UPDATED,
  COURSE_UPDATED_ERROR,
  COURSE_DELETED,
  COURSE_DELETING_ERROR,
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
    case GET_COURSES:
    case GET_COURSES_BY_BOOTCAMP:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_COURSE:
    case COURSE_ADDED:
    case COURSE_UPDATED:
    case COURSE_DELETED:
      return {
        ...state,
        current_course: payload,
        loading: false,
      };
    case COURSE_ERROR:
    case COURSE_ADDED_ERROR:
    case COURSE_UPDATED_ERROR:
    case COURSE_DELETING_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_COURSE:
      return {
        ...state,
        courses: [],
        current_course: null,
        loading: false,
      };
    default:
      return state;
  }
}
