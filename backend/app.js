const express = require('express');
//const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 4000;
const {MONGOURI} = require('./keys');

//Initialize
dotenv.config();
const app = express();

//mongoose.connect(MONGOURI, {
    //useNewUrlParser:true,
    //useUnifiedTopology:true
//});
//mongoose.connection.on('connected', ()=> {
    //console.log('Connected to MongoDB');
//});
//mongoose.connection.on('error', (err)=> {
    //console.log('Connection error', err);
//});

//const mqttClient = require('./mqtt/mqtt_client');
const mqttPublish = require('./mqtt/mqtt_publish');

//Middleware
app.use(cors());
app.use(express.json());
require('./models/devices');
require('./models/rooms');

//Routes
app.use(require('./routes/device'));
app.use(require('./routes/room'));

//Port
app.listen(port, ()=> {
    console.log('Server is running on port: ', port);
});