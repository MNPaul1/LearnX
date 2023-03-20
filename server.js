const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger")
const errorHandler = require("./middleware/error")
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require('colors');
const fileupload = require('express-fileupload')
const path = require('path')

//load env vars
dotenv.config({ path: "./config/config.env" });

//route files
const bootcamps = require("./routes/bootcamps")
const courses = require("./routes/courses")
const auth = require('./routes/auth')
//connect to database
connectDB()

const app = express();

//Body Parser
app.use(express.json())

//dev logging middleware
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}

//file uploading
app.use(fileupload());


//static folder
app.use(express.static(path.join(__dirname,'public')))

//Mount routers
app.use('/api/v1/bootcamps',bootcamps)
app.use('/api/v1/courses',courses)
app.use('/api/v1/auth',auth)


app.use(errorHandler)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//Handle unhandled rejections
process.on("unhandledRejection",(err,promise) =>{
  console.log(`Error: ${err.message}`)
  //Close server and exit process
  server.close(() => process.exit(1))
})