import { GET_REVIEWS, REVIEW_ERROR } from "../actions/types";

const initialState = {
  reviews: [],
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