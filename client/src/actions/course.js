import { GET_COURSES_BY_BOOTCAMP, COURSE_ERROR} from "./types";
import axios from "axios";

//Get courses by bootcamp id
export const getCoursesByBootcamp = (id) =>async dispatch => {
    try {
        const res = await axios.get(`/api/v1/bootcamps/${id}/courses`)
        dispatch({
            type: GET_COURSES_BY_BOOTCAMP,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: COURSE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}