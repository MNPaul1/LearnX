const errorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamps");
const asyncHandler = require('../middleware/async')
//@desc      Get all bootcamps
//@route     GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamp.length,
      data: bootcamp,})
});

//@desc      Get single bootcamp
//@route     GET /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new errorResponse(`Bootcamp not find with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
});

//@desc      Create a new bootcamp
//@route     POST /api/v1/bootcamps
//@access    Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
});

//@desc      Update bootcamp
//@route     PUT /api/v1/bootcamps/:id
//@access    Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return next(
        new errorResponse(`Bootcamp not find with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
});

//@desc      Delete a bootcamp
//@route     DELETE /api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp){
      return next(
        new errorResponse(`Bootcamp not find with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: {},
    });
});
