const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 4000;
const {MONGOURI} = require('./keys');

//Initialize
dotenv.config();
const app = express();

mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected', ()=> {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err)=> {
    console.log('Connection error', err);
});

const mqttClient = require('./mqtt');

//Middleware
app.use(express.json());

//Routes


//Port
app.listen(port, ()=> {
    console.log('Server is running on port: ', port);
});