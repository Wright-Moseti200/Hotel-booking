let mongoose = require("mongoose");
require("dotenv").config();
let connectDB = async() =>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/hotel`);
        console.log("Database connected successfully");
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {connectDB};
