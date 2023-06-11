import axios from "axios";
import { setAlert } from "./alert";
import { BOOTCAMP_ERROR, CLEAR_BOOTCAMP, GET_BOOTCAMP, GET_BOOTCAMPS } from "./types";

//Get current Bootcamps
export const getBootcampById = (id) => async dispatch =>{
    try {
        const res = await axios.get(`/api/v1/bootcamps/${id}`)
        dispatch({
            type: GET_BOOTCAMP,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: BOOTCAMP_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
} 

//Get all Bootcamps
export const getBootcamps = () => async dispatch =>{
    dispatch({type: CLEAR_BOOTCAMP})
    try {
        const res = await axios.get(`/api/v1/bootcamps`)
        dispatch({
            type: GET_BOOTCAMPS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: BOOTCAMP_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
} 