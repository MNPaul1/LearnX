const express = require('express')
const {register, getMe, updateDetails, updatePassword, logout} = require('../controllers/auth')
const {login} = require('../controllers/auth')
const {protect} = require('../middleware/auth')
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(protect, logout)
router.route('/me').get(protect, getMe)
router.route('/updatedetails').put(protect, updateDetails)
router.route('/updatepassword').put(protect, updatePassword)

module.exports = router