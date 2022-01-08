const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devices = mongoose.model('Devices');
import {getDevices, addDevice} from '../controllers/deviceController';



//Get all devices
router.get('/', getDevices);
//Add device
router.post('/', addDevice);

export default router;