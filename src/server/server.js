 import User from './src/models/user'

const path = require('path');
 const express = require('express'); 
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
// Allows you to set port in the project properties
const port = process.env.PORT || 5000;

app.use(cors());
// Allows you to parse json
app.use(express.json()) 

// Mongo setup
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, () =>
    console.log("MongoDB database connection established successfully")
);

const userRouter = require('./src/routes/users');
app.use('/users', userRouter);

// Starts the server
app.listen(port, () => {
    console.log(User.length);
    console.log(`Server is running on port: ${port}`);
  })