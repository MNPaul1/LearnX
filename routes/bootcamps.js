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

const Bootcamp = require('../models/Bootcamps')
const advancedResults = require('../middleware/advancedResults')

//include other resources
const courseRouter = require('./courses')


const router = express.Router();

//Reroute into other resource router
router.use("/:bootcampId/courses",courseRouter)

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)

router.route("/").get(advancedResults(Bootcamp,'courses'), getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;
