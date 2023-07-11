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
      dispatch({
        type: BOOTCAMP_CREATED,
        payload: res.data,
      });
      dispatch(setAlert("Bootcamp Created", "success"))

    } catch (error) {
      let errors = error.response.data.error;
      console.log(error);
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
export const updateBootcamp =
  (
    id,
    name,
    description,
    website,
    email,
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
      careers,
      phone,
      housing,
      jobAssistance,
      jobGuarantee,
      acceptGi,
    });
    try {
      const res = await axios.put(`/api/v1/bootcamps/${id}`, body, config);
      dispatch({
        type: BOOTCAMP_UPDATED,
        payload: res.data,
      });
      dispatch(setAlert("Bootcamp Updated", "success"))

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
  export const deleteBootcamp = (id) => async (dispatch) =>{
    try {
      const res = await axios.delete(`/api/v1/bootcamps/${id}`)
      dispatch({
        type: BOOTCAMP_DELETED,
        payload: res.data
      })
      dispatch(setAlert("Bootcamp Deleted", "success"))
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
  }

  //Upload bootcamp Photo
  export const uploadPhoto = (id, photo) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      console.log("photo ;", photo)
      // const body = JSON.parse({
      //   file: photo
      // })
      const res = await axios.put(`/api/v1/bootcamps/${id}/photo`, photo, config)
      dispatch({
        type: PHOTO_UPLOADED,
        payload: res.data
      })
      dispatch(setAlert("Photo Uploaded", "success"))
    } catch (error) {

        let errors = error.response.data.error;
        console.log(errors)
        if (errors) {
          errors = errors.split(",");
          errors.forEach((error) => dispatch(setAlert(error, "error")));
        }
        dispatch({
          type: PHOTO_UPLOADED_ERROR,
        })
    }
  }
