const express = require("express");
const dotenv = require("dotenv");
const app = express();

//route files
const bootcamps = require("./routes/bootcamps")

//load env vars
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3000;

//Mount routers
app.use('/api/v1/bootcamps',bootcamps)



app.listen(PORT, () => {
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
