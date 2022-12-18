const express = require("express")
const dotenv = require("dotenv")
const app = express()

//load env vars
dotenv.config({path:'./config/config.env'})
const PORT = process.env.PORT||3000
app.get("/",(req,res) =>{
    res.send("hi")
})


app.listen(PORT,() =>{
    console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})