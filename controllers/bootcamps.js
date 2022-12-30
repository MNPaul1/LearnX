const errorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamps");
const asyncHandler = require('../middleware/async')
const geocoder = require("../utils/geocoder")

//@desc      Get all bootcamps
//@route     GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = {...req.query}

    //Fields to exclude
    const removeFields = ['select']

    //loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])


    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operators [$qt/$qte...]
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`)


    query =  Bootcamp.find(JSON.parse(queryStr));

    if(req.query.select){
      const selectFields = req.query.select.split(",").join(' ');
      query = query.select(selectFields);
    }

    const bootcamp = await query;
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

//@desc      Get bootcamps within radius
//@route     GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access    Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const {zipcode, distance} = req.params;

  // get lat, lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //Cal radius using radians
  //Divide distance by radius of earth
  // radius of the earth = 3,963 miles
  const radius = distance/3963;

  const bootcamps = await Bootcamp.find({location: {$geoWithin:{$centerSphere:[[lng,lat],radius]}}});

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  })
});
