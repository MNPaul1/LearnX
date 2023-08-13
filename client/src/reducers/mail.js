import { MAIL_SENT, MAIL_SENT_ERROR } from "../actions/types";

const initialState = {
  msg: "",
  loading: true,
  error: {},
};
export default function mail(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MAIL_SENT:
      return {
        ...state,
        msg: payload,
        loading: false,
      };
      break;
    case MAIL_SENT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
      break;
  }
}
