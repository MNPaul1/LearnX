import {
  GET_REVIEW,
  GET_REVIEWS,
  REVIEW_DELETED,
  REVIEW_ERROR,
  REVIEW_UPDATED,
} from "../actions/types";

const initialState = {
  reviews: [],
  current_review: {},
  loading: true,
  error: {},
};

export default function review(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false,
      };
    case GET_REVIEW:
      return {
        ...state,
        current_review: payload,
        loading: false,
      };
    case REVIEW_UPDATED:
    case REVIEW_DELETED:
      return {
        ...state,
        current_review: payload,
        loading: false,
      };
    case REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
