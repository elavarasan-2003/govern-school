const express = require('express');
//const colors = require('colors');
// const morgan = require('morgan');
//const dotenv = require('dotenv');
const connectDB = require('./config/db');

//dotenv
//dotenv.config();

//mongodb
connectDB();

//REST
const app = express();

app.use(express.json());
//MiddleWare

app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/schools',require('./routes/schooldetails'));
const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log('Server Running');
});
//Routes


//listen
  
