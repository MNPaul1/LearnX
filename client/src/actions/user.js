import axios from "axios";
import { CLEAR_BOOTCAMP, GET_USER, GET_USERS, USER_DELETED, USER_ERROR } from "./types";
import { setAlert } from "./alert";

//Get all users
export const getUsers = () => async dispatch =>{
    dispatch({type: CLEAR_BOOTCAMP})
    try {
        const res = await axios.get(`/api/v1/users`)
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch (error) {
        let errors = error.response.data.error;
        if (errors) {
          errors = errors.split(",");
          errors.forEach((error) => dispatch(setAlert(error, "error")));
        }
        dispatch({
          type: USER_ERROR,
          payload: error
        });      
    }
}
//Get User by Id
export const getUserById = (id) => async dispatch =>{
    try {
        const res = await axios.get(`/api/v1/users/${id}`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (error) {
        let errors = error.response.data.error;
        if (errors) {
          errors = errors.split(",");
          errors.forEach((error) => dispatch(setAlert(error, "error")));
        }
        dispatch({
          type: USER_ERROR,
          payload: error
        });
    }
}


//Delete User
export const deleteUser = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`/api/v1/users/${id}`)
        dispatch({
            type: USER_DELETED,
            payload: res.data
        })
        dispatch(setAlert("User Deleted Successfully", "success"))
    } catch (error) {
        let errors = error.response.data.error;
        if (errors) {
          errors = errors.split(",");
          errors.forEach((error) => dispatch(setAlert(error, "error")));
        }
        dispatch({
          type: USER_ERROR,
          payload: error
        });
    }
}