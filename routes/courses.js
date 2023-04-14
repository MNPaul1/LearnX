const express = require("express");
const { getCourses,getCourse, addCourse, updateCourse, deleteCourse } = require("../controllers/courses");
const {protect, authorize} = require("../middleware/auth")
const router = express.Router({mergeParams:true});
const advancedResults = require('../middleware/advancedResults')
const Courses = require('../models/Courses')

router.route("/").get(advancedResults(Courses,{path:'bootcamp', select: 'name description'}) ,getCourses).post(protect, authorize('publisher', 'admin'), addCourse);
router.route("/:id").get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse).delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
