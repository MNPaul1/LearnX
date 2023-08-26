import axios from "axios";
import { setAlert } from "./alert";
import {
  BOOTCAMP_ERROR,
  CLEAR_BOOTCAMP,
  GET_BOOTCAMP,
  GET_BOOTCAMPS,
  BOOTCAMP_CREATED,
  BOOTCAMP_UPDATED_ERROR,
  BOOTCAMP_UPDATED,
  BOOTCAMP_DELETED,
  PHOTO_UPLOADED_ERROR,
  PHOTO_UPLOADED,
} from "./types";

//Get current Bootcamps
export const getBootcampById = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_BOOTCAMP });
  try {
    const res = await axios.get(`/api/v1/bootcamps/${id}`);
    dispatch({
      type: GET_BOOTCAMP,
      payload: res.data,
    });
  } catch (error) {
    const {data} = error.response
    dispatch(setAlert(data.error, 'error'))
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
export const getBootcamps = (page) => async (dispatch) => {
  dispatch({ type: CLEAR_BOOTCAMP });
  try {
    let limit;
    if (page) {
      limit=4
    }
    const res = await axios.get(`/api/v1/bootcamps?limit=${limit}&page=${page}`);
    dispatch({
      type: GET_BOOTCAMPS,
      payload: res.data,
    });
  } catch (error) {
    const {data} = error.response
    dispatch(setAlert(data.error, 'error'))
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
export const createBootcamp = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/v1/bootcamps", formData, config);
    dispatch({
      type: BOOTCAMP_CREATED,
      payload: res.data,
    });
    dispatch(setAlert("Bootcamp Created", "success"));
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: BOOTCAMP_ERROR,
    });
  }
};

//Update Bootcamp Info
export const updateBootcamp = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/v1/bootcamps/${id}`, formData, config);
    dispatch({
      type: BOOTCAMP_UPDATED,
      payload: res.data,
    });
    dispatch(setAlert("Bootcamp Updated", "success"));
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: BOOTCAMP_UPDATED_ERROR,
    });
  }
};

//Delete Bootcamp
export const deleteBootcamp = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/bootcamps/${id}`);
    dispatch({
      type: BOOTCAMP_DELETED,
      payload: res.data,
    });
    dispatch(setAlert("Bootcamp Deleted", "success"));
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: BOOTCAMP_UPDATED_ERROR,
    });
  }
};

//Upload bootcamp Photo
export const uploadPhoto = (id, photo) => async (dispatch) => {
  try {
    
    const formData = new FormData()
    formData.append("file", photo)
    const res = await axios.put(`/api/v1/bootcamps/${id}/photo`, formData);
    dispatch({
      type: PHOTO_UPLOADED,
      payload: res.data,
    });
    dispatch(setAlert("Photo Uploaded", "success"));
  } catch (error) {
    let errors = error.response.data.error;
    console.log(errors);
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: PHOTO_UPLOADED_ERROR,
    });
  }
};
