const errorResponse = require("../utils/errorResponse");
const Review = require("../models/Review");
const asyncHandler = require("../middleware/async");
const Bootcamps = require("../models/Bootcamps");

//@desc      Get reviews
//@route     GET /api/v1/reviews
//@route     GET /api/v1/bootcamps/:bootcampId/reviews
//@access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc      Get a single review
//@route     GET /api/v1/reviews/:id
//@access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!review) {
    return next(
      new errorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: review,
  });
});

//@desc      Add a review
//@route     POST /api/v1/bootcamps/:bootcampId/reviews/
//@access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id

  const bootcamp = await Bootcamps.findById(req.params.bootcampId);
  if (!bootcamp){
    return next(new errorResponse(`No bootcamp found with the id of ${req.params.bootcampId}`,404))
  }
  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

//@desc      Update a review
//@route     PUT /api/v1/reviews/:id
//@access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review){
    return next(new errorResponse(`No review found with the id of ${req.params.id}`,404))
  }
  //make sure review belong to user or user is admin
  if(req.user.role!=='admin' && review.user.toString()!==req.user.id){
    return next(new errorResponse(`Not authorize to update route`,501))
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body,{
    new:true,
    runValidators:true
  })

  res.status(201).json({
    success: true,
    data: review,
  });
});

//@desc      Add a review
//@route     POST /api/v1/bootcamps/:bootcampId/reviews/
//@access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id

  const bootcamp = await Bootcamps.findById(req.params.bootcampId);
  if (!bootcamp){
    return next(new errorResponse(`No bootcamp found with the id of ${req.params.bootcampId}`,404))
  }
  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

//@desc      Delete a review
//@route     DELETE /api/v1/reviews/:id
//@access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review){
    return next(new errorResponse(`No review found with the id of ${req.params.id}`,404))
  }
  //make sure review belong to user or user is admin
  if(req.user.role!=='admin' && review.user.toString()!==req.user.id){
    return next(new errorResponse(`Not authorize to delete route`,501))
  }

  await review.remove()

  res.status(201).json({
    success: true,
    data: {},
  });
});