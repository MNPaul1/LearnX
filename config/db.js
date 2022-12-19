const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}
module.exports = connectDB;