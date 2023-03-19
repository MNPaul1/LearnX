const errorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamps");
const asyncHandler = require('../middleware/async')
const geocoder = require("../utils/geocoder")
const path = require('path')
//@desc      Get all bootcamps
//@route     GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = {...req.query}

    //Fields to exclude
    const removeFields = ['select','page','limit']

    //loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])


    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operators [$qt/$qte...]
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`)


    query =  Bootcamp.find(JSON.parse(queryStr)).populate('courses');

    if(req.query.select){
      const selectFields = req.query.select.split(",").join(' ');
      query = query.select(selectFields);
    }

    //Pagination
    const page = parseInt(req.query.page,10)||1;
    const limit = parseInt(req.query.limit,10)||100;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await Bootcamp.countDocuments();


    query = query.skip(startIndex).limit(limit);



    const bootcamp = await query;

    //Pagination results
    const pagination = {}
    if(endIndex<total){
      pagination.next = {
        page:page+1,
        limit
      }
    }

    if (startIndex>0){
      pagination.prev = {
        page:page-1,
        limit
      }
    }



    res.status(200).json({
      success: true,
      count: bootcamp.length,
      pagination,
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
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
      return next(
        new errorResponse(`Bootcamp not find with id of ${req.params.id}`, 404)
      );
    }
    bootcamp.remove();
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

//@desc      upload photo for bootcamp
//@route     PUT /api/v1/bootcamps/:id/photo
//@access    Private
exports.bootcampPhotoUpload = asyncHandler( async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new errorResponse(`Bootcamp not find with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files){
    return next(
      new errorResponse(`Please uplaod a file.`, 400)
    );
  }
  const file = req.files.file;

  //make sure file is a photo
  if (!file.mimetype.startsWith('image')){
    return next(
      new errorResponse(`Please upload an image file.`, 400)
    );
  }

  //check file size
  if (file.size>process.env.MAX_FILE_UPLOAD){
    return next(
      new errorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}.`, 400)
    );
  }

  //create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  //file upload 
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err){
      console.error(err)
      return next(
        new errorResponse(`Problem with file upload.`, 500)
      );
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});
    res.status(200).json({
      success: true,
      data: file.name
    })
  })
});