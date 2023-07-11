const express = require('express')
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users')
const {protect,authorize} = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')
const User = require("../models/User")
const router = express.Router()

router.use(protect);
// router.use(authorize('admin'))

router.route('/').get(advancedResults(User), getUsers).post(authorize('admin'), createUser);
router.route('/:id').get(getUser).put(authorize('admin'),updateUser).delete(authorize('admin'), deleteUser);

module.exports = router