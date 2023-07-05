import axios from "axios";
import { GET_REVIEWS, REVIEW_ERROR } from "./types";


// Get reviews for a bootcamp
export const getReviews = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/v1/bootcamps/${id}/reviews`)
        dispatch({
            type: GET_REVIEWS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: REVIEW_ERROR,
            payload: {        msg: error.response.statusText,
                status: error.response.status,}
        })
    }
}