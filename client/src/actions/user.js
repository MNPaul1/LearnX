import axios from "axios";
import { GET_USER, USER_ERROR } from "./types";

//Get user by ID
export const getUserById = () => async dispatch =>{
    try {
        const res = await axios.get(`/api/v1/users`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status}
        })        
    }
}