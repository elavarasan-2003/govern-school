const mongoose = require('mongoose');


const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://0.0.0.0/GovernmentSchool")
        console.log('Mongodb connected');
    } catch(error){
        console.log("mongo db server issue")
    }
}

module.exports = connectDB;