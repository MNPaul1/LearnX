import {
  GET_BOOTCAMP,
  BOOTCAMP_ERROR,
  GET_BOOTCAMPS,
  CLEAR_BOOTCAMP,
  BOOTCAMP_CREATED,
  BOOTCAMP_UPDATED,
  BOOTCAMP_UPDATED_ERROR,
  BOOTCAMP_DELETED,
  PHOTO_UPLOADED,
  PHOTO_UPLOADED_ERROR,
} from "../actions/types";
const initialState = {
  bootcamp: null,
  bootcamps: [],
  loading: true,
  photo: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOTCAMP:
    case BOOTCAMP_CREATED:
    case BOOTCAMP_UPDATED:
      return {
        ...state,
        bootcamp: payload,
        loading: false,
      };
    case BOOTCAMP_ERROR:
    case BOOTCAMP_UPDATED_ERROR:
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
    case BOOTCAMP_DELETED:
      return {
        ...state,
        bootcamp: payload,
        loading: false,
      };
    case PHOTO_UPLOADED:
      return {
        ...state,
        photo: payload,
        loading: false,
      };
    case PHOTO_UPLOADED_ERROR:
      return {
        ...state,
        photo: null,
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
