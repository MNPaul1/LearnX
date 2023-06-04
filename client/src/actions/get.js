import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ALL_BOOTCAMPS
} from "../actions/types";




//Get All Bootcamps
export const get_all_bootcamps = (...rest) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const body = JSON.stringify();
  
    try {
      const res = await axios.get("/api/v1/bootcamps");
      dispatch({
        type: GET_ALL_BOOTCAMPS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      let errors = error.response.data.error;
      if (errors) {
        errors = errors.split(",");
        errors.forEach((error) => dispatch(setAlert(error, "error")));
      }
    }
  };