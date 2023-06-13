import { combineReducers } from "redux";
import alert from './alert'
import auth from "./auth";
import bootcamp from "./bootcamp"
import courses_by_bootcamp from "./course";
export default combineReducers({
    alert, 
    auth,
    bootcamp,
    courses_by_bootcamp
})