const path = require('path');
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
// Allows you to set port in the project properties
const port = process.env.PORT || 3000;

app.use(cors());
// Allows you to parse json
app.use(express.json()) 

// Mongo setup
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
  })