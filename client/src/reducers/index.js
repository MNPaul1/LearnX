import { combineReducers } from "redux";
import alert from './alert'
import auth from "./auth";
import bootcamp from "./bootcamp"
import course from "./course";
export default combineReducers({
    alert, 
    auth,
    bootcamp,
    course
})