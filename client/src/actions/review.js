import axios from "axios";
import {
  GET_REVIEWS,
  REVIEW_ERROR,
  GET_REVIEW,
  REVIEW_UPDATED,
  REVIEW_DELETED,
  REVIEW_ADDED,
} from "./types";
import { setAlert } from "./alert";

// Get reviews for a bootcamp
export const getReviews = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: REVIEW_ERROR
    });
  }
};

//Get a review by Id
export const getReviewById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/reviews/${id}`);
    dispatch({
      type: GET_REVIEW,
      payload: res.data,
    });
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: REVIEW_ERROR
    });
  }
};
//Add review
export const addReview = (id, formData) => async (dispatch) =>{
  try {
    const res = await axios.post(`/api/v1/bootcamps/${id}/reviews`, formData)
    dispatch({
      type: REVIEW_ADDED,
      payload: res.data
    })
    dispatch(setAlert("Review Added Successfully", "success"))
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }

    dispatch({
      type: REVIEW_ERROR
    });

  }
}
//Update a review by id
export const updateReview = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/reviews/${id}`, formData);
    dispatch({
      type: REVIEW_UPDATED,
      payload: res.data,
    });
    dispatch(setAlert("Review Updated Successfully", "success"));
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: REVIEW_ERROR,
    });
  }
};

//Delete Review
export const deleteReview = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/reviews/${id}`);
    dispatch({
      type: REVIEW_DELETED,
      payload: res.data,
    });
    dispatch(setAlert("Review Deleted Successfully", "success"));
  } catch (error) {
    let errors = error.response.data.error;
    if (errors) {
      errors = errors.split(",");
      errors.forEach((error) => dispatch(setAlert(error, "error")));
    }
    dispatch({
      type: REVIEW_ERROR,
      payload: error
    });

  }
};
