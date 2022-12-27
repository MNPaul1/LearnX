const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
mongoose.set('strictQuery', false);

// load envcs
dotenv.config({path: "./config/config.env"})

//load models
const Bootcamp = require("./models/Bootcamps");


//connect DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
});


//Read json file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

//Import into DB
const importData = async () =>{
    try {
        await Bootcamp.create(bootcamps)
        console.log("Data Imported...".green.inverse);
        process.exit()
    } catch (error) {
        console.error(error);

    }
}


//Delete Data
const deleteData = async () =>{
    try {
        await Bootcamp.deleteMany()
        console.log("Data Destroyed...".red.inverse);
        process.exit()
    } catch (error) {
        console.error(error);

    }
}

if (process.argv[2]==="-i"){
    importData()
}
else if(process.argv[2]==="-d"){
    deleteData()
}
