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
var publishSetAC = mqtt.connect(address);
var publishSetLamp = mqtt.connect(address);

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

const setAC = async (req, res) => {
    var status = req.body;
    var string = JSON.stringify(status);
    var objectValue = JSON.parse(string);
    try {
        publishSetAC.publish("alvianAirConPower", objectValue['alvianAirConPower']);
        publishSetAC.publish("alvianAirConTemp", objectValue['alvianAirConTemp']);
        publishSetAC.publish("alvianAirConFan", objectValue['alvianAirConFan']);
        res.status(201).json({message: "AC state changed."});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const setLamp = async (req, res) => {
    var status = req.body;
    var string = JSON.stringify(status);
    var objectValue = JSON.parse(string);
    try {
        publishSetLamp.publish("alvianLampPower", objectValue['alvianLampPower']);
        res.status(201).json({message: "Lamp state changed."});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAC = async (req, res) => {
    
    try {
        res.status(200).json({
            'Room Temp': msgTemp,
            'Room Humidity': msgHumid
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getLamp = async (req, res) => {
    try {
        res.status(200).json({
            'Room Brightness': msgBright,
            'Room Motion': msgMotion
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get all devices
router.get('/ac', getAC);
router.get('/lamp', getLamp);

//Set device
router.post('/setlamp', setLamp);
router.post('/setac', setAC);

module.exports = router;