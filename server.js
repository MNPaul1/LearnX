const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger")
const errorHandler = require("./middleware/error")
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require('colors');



//load env vars
dotenv.config({ path: "./config/config.env" });

//route files
const bootcamps = require("./routes/bootcamps")
const courses = require("./routes/courses")
//connect to database
connectDB()

const app = express();

//Body Parser
app.use(express.json())

//dev logging middleware
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}


//Mount routers
app.use('/api/v1/bootcamps',bootcamps)
app.use('/api/v1/courses',courses)

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