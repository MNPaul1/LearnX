import axios from "axios";
import { setAlert } from "./alert";
import {
  BOOTCAMP_ERROR,
  CLEAR_BOOTCAMP,
  GET_BOOTCAMP,
  GET_BOOTCAMPS,
  BOOTCAMP_CREATED,
} from "./types";

//Get current Bootcamps
export const getBootcampById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${id}`);
    dispatch({
      type: GET_BOOTCAMP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get all Bootcamps
export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: CLEAR_BOOTCAMP });
  try {
    const res = await axios.get(`/api/v1/bootcamps`);
    dispatch({
      type: GET_BOOTCAMPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Create Bootcamp
export const createBootcamp =
  (
    name,
    description,
    website,
    email,
    address,
    careers,
    phone,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      description,
      website,
      email,
      address,
      careers,
      phone,
      housing,
      jobAssistance,
      jobGuarantee,
      acceptGi,
    });
    try {
      const res = await axios.post("/api/v1/bootcamps", body, config);
      console.log(res.data)
      dispatch({
        type: BOOTCAMP_CREATED,
        payload: res.data,
      });
    } catch (error) {
      let errors = error.response.data.error;
      console.log(error)
      if (errors) {
        errors = errors.split(",");
        errors.forEach((error) => dispatch(setAlert(error, "error")));
      }
      dispatch({
        type: BOOTCAMP_ERROR,
      });
    }
  };
