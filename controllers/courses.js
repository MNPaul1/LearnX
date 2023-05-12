const errorResponse = require("../utils/errorResponse");
const Course = require("../models/Courses");
const asyncHandler = require("../middleware/async");
const Bootcamps = require("../models/Bootcamps");

//@desc      Get all courses
//@route     GET /api/v1/courses/bootcamps/:bootcamp_id/
//@route     GET /api/v1/bootcamps/:bootcampId/courses
//@access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {

  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({ 
      success: true,
      count: courses.length,
      data: courses,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
});
//@desc      Get a single courses
//@route     GET /api/v1/courses/:id
//@access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({path:'bootcamp',select:'name description' })
  if (!course){
    return next(new errorResponse(`No course with the id of ${req.params.id}`),404)
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});
//@desc      Add a single courses
//@route     POST /api/v1/bootcamp/:bootcampId/courses
//@access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId
  req.body.user = req.user.id
  const bootcamp = await Bootcamps.findById(req.params.bootcampId)
  if (!bootcamp){
    return next(new errorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),404)
  }
  //Make sure user is bootcamp owner
  if(bootcamp.user.toString()!==req.user.id && req.user.role!=='admin'){
    return next(
      new errorResponse(`User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}.`, 401)
    );
  }
  const course = await Course.create(req.body)
  res.status(200).json({
    success: true,
    data: course,
  });
});
//@desc      Update a single courses
//@route     PUT /api/v1/courses/:id
//@access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id)
  if (!course){
    return next(new errorResponse(`No course with the id of ${req.params.id}`),404)
  }

  if(course.user.toString()!==req.user.id && req.user.role!=='admin'){
    return next(
      new errorResponse(`User ${req.user.id} is not authorized to update course ${course.id}.`, 401)
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  res.status(200).json({
    success: true,
    data: course,
  });
});
//@desc      Delete a single courses
//@route     DELETE /api/v1/courses/:id
//@access    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)
  if (!course){
    return next(new errorResponse(`No course with the id of ${req.params.id}`),404)
  }
  if(course.user.toString()!==req.user.id && req.user.role!=='admin'){
    return next(
      new errorResponse(`User ${req.user.id} is not authorized to delete course ${course._id}.`, 401)
    );
  }
  await course.remove()
  res.status(200).json({
    success: true,
    data: {},
  });
});