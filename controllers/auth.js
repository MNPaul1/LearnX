const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require('../models/User')


//@desc      Register a user
//@route     POST /api/v1/auth/register
//@access    Public
exports.register = asyncHandler(async(req, res, next) =>{
    const {name, email, password, role} = req.body

    //Create user
    const user = await User.create({name, email, password, role})

    //create token
    const token = user.getSignedJwtToken()

    res.status(200).json({
        sucess:true,
        token
    });
}) 
//@desc      Login a user
//@route     POST /api/v1/auth/register
//@access    Public
exports.login = asyncHandler(async(req, res, next) =>{
    const {email, password} = req.body

    //Validate email and password
    if(!email || !password){
        return next(new errorResponse('Please provide a email and password',400))
    }
    //check for user
    const user = await User.findOne({email}).select('+password');

    if (!user){
        return next(new errorResponse('Invalid credentials',401))
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch){
        return next(new errorResponse('Invalid credentials',401))
    }

    //create token
    const token = user.getSignedJwtToken()

    res.status(200).json({
        sucess:true,
        token
    });
}) 