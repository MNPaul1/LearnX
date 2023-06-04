import { GET_ALL_BOOTCAMPS } from "../actions/types";

const initialState = {
  name: null,
  description: null,
  website: null,
  phone: null,
  email: null,
  careers: [],
  photo: null,
  housing: null,
  jobAssistance: null,
  jobGuarantee: null,
  acceptGi: null,
  loading: true,
  user: null,
};

export default function getReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    default:
      return state;
  }
}
