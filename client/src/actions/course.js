import { setAlert } from "./alert";
import { GET_COURSES_BY_BOOTCAMP, COURSE_ERROR, GET_COURSES, CLEAR_COURSE, GET_COURSE, COURSE_ADDED, COURSE_ADDED_ERROR, COURSE_UPDATED_ERROR, COURSE_UPDATED, COURSE_DELETED, COURSE_DELETING_ERROR} from "./types";
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

//Add Course
export const addCourse = (id, formData) => async (dispatch) =>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    try {
        const res = axios.post(`/api/v1/bootcamps/${id}/courses`, formData, config)
        dispatch({
            type: COURSE_ADDED,
            payload: res.data 
        })
        dispatch(setAlert("Course Added Successfully", "success"))
    } catch (error) {
        console.error(error)
        dispatch({
            type: COURSE_ADDED_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//Update Course
export const updateCourse = (id, formData) => async (dispatch) =>{
    try{
        const res = axios.put(`/api/v1/courses/${id}`, formData)
        dispatch({
            type: COURSE_UPDATED,
            payload: res.data
        })
        dispatch(setAlert("Course Updated Successfully", "success"))
    } catch(error){
        dispatch({
            type: COURSE_UPDATED_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//Delete Course
export const deleteCourse = (id) => async (dispatch) =>{
    try {
        const res = await axios.delete(`/api/v1/courses/${id}`)
        dispatch({
            type:COURSE_DELETED,
            payload: res.data
        })
        dispatch(setAlert("Course Deleted Successfully", "success"))
    } catch (error) {
        dispatch({
            type: COURSE_DELETING_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}