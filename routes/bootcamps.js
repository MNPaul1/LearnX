const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const {protect, authorize} = require('../middleware/auth')
const Bootcamp = require('../models/Bootcamps')
const advancedResults = require('../middleware/advancedResults')

//include other resources
const courseRouter = require('./courses')
const reviewRouter = require('./reviews')


const router = express.Router();

//Reroute into other resource router
router.use("/:bootcampId/courses",courseRouter)
router.use("/:bootcampId/reviews",reviewRouter)

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)

router.route("/").get(advancedResults(Bootcamp,'courses'), getBootcamps).post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

module.exports = router;
