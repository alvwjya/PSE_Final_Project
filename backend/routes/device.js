const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devices = mongoose.model('Devices');
require('../models/devices');

// --------- MQTT -----------
const mqtt = require('mqtt');
const address = "mqtt://broker.mqtt-dashboard.com";
var msgTemp = '';
var msgHumid = '';
var msgBright = '';
var msgMotion = '';

console.log('[MqttClient] Connecting to MQTT..');
var clientTemp = mqtt.connect(address);
var clientHumidity = mqtt.connect(address);
var clientBright = mqtt.connect(address);
var clientMotion = mqtt.connect(address);

clientTemp.on('connect', function() {
    clientTemp.subscribe('alvianRoomTemperature');
    console.log('Subscribe room temp successful');
});

clientHumidity.on('connect', function() {
    clientHumidity.subscribe('alvianRoomHumidity');
    console.log('Subscribe room humidity successful');
});

clientBright.on('connect', function() {
    clientBright.subscribe('alvianRoomBrightness');
    console.log('Subscribe room brightness successful');
});

clientMotion.on('connect', function() {
    clientMotion.subscribe('alvianRoomMotion');
    console.log('Subscribe room motion successful');
});

//---Message---

clientTemp.on('message', function(topic, message) {
    msgTemp = message.toString();
    console.log(msgTemp);
});

clientHumidity.on('message', function(topic, message) {
    console.log(message.toString());
    msgHumid = message.toString();
});

clientBright.on('message', function(topic, message) {
    console.log(message.toString());
    msgBright = message.toString();
});

clientMotion.on('message', function(topic, message) {
    console.log(message.toString());
    msgMotion = message.toString();
});
// ---------- END OF MQTT ------------

const addDevice = async (req, res) => {
    const device = new Devices(req.body);
    try {
        const addedDevice = await device.save();
        res.status(201).json(addedDevice);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getRoomTemp = async (req, res) => {
    
    try {
        res.status(200).json(msgTemp);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getRoomHumid = async (req, res) => {
    try {
        //const devices = await Devices.find();
        //res.json(devices);
        res.status(200).json(msgHumid);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getRoomBright = async (req, res) => {
    try {
        //const devices = await Devices.find();
        //res.json(devices);
        res.status(200).json(msgBright);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getRoomMotion = async (req, res) => {
    try {
        //const devices = await Devices.find();
        //res.json(devices);
        res.status(200).json(msgMotion);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get all devices
router.get('/roomtemp', getRoomTemp);
router.get('/roomhumid', getRoomHumid);
router.get('/roombright', getRoomBright);
router.get('/roommotion', getRoomMotion);
//Add device
router.post('/device', addDevice);

module.exports = router;