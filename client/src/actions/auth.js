import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
//Load  User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/v1/auth/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register =
  ({ name, email, password, role }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password, role });

    try {
      const res = await axios.post("/api/v1/auth/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      console.error(error.response.data);
      let errors = error.response.data.error;
      if (errors) {
        errors = errors.split(",");
        errors.forEach((error) => dispatch(setAlert(error, "error")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
