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
  USER_UPDATED,
  USER_ERROR
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
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
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

//Update User
export const updateUser = (formData) => async dispatch =>{
  try {
      const res = await axios.put(`/api/v1/auth/updatedetails`, formData)
      dispatch({
          try: USER_UPDATED,
          payload: res.data
      })
  } catch (error) {
      let errors = error.response.data.error;
      if (errors) {
        errors = errors.split(",");
        errors.forEach((error) => dispatch(setAlert(error, "error")));
      }
      dispatch({
        type: USER_ERROR,
        payload: error
      });
  }
}


//Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};


