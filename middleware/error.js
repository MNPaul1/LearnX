const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next) =>{
    let error = {...err}
    error.message = err.message
    console.log(err.stack.red);

    //mongo bad objectID
    if (err.name==="CastError"){
        const message = `Bootcamp not find with id of ${err.value}`
        error = new ErrorResponse(message,404)
    }

    //mongo duplicate key
    if(err.code===11000){
        const message = `Duplicate field entered.`
        error = new ErrorResponse(message,400)
    }

    //mongo bad objectID
    if (err.name==="ValidationError"){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message,400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}


module.exports = errorHandler;