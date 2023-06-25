import { GET_COURSES_BY_BOOTCAMP, COURSE_ERROR, GET_COURSES, CLEAR_COURSE, GET_COURSE} from "./types";
import axios from "axios";


//Get All courses
export const getCourses = () => async dispatch => {
  dispatch({ type: CLEAR_COURSE });

    try {
        const res = await axios.get('/api/v1/courses')
        dispatch({
            type: GET_COURSES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: COURSE_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status}
        })
    }
}

//Get a course by Id
export const getCourseById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/v1/courses/${id}`)
        dispatch({
            type: GET_COURSE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: COURSE_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status}
        })
    }
}


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