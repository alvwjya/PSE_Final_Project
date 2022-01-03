const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//psedatabase
//Initialize
dotenv.config();
const app = express();

const mqttClient = require('./mqtt');

//Middleware
