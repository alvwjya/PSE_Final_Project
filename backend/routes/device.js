const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devices = mongoose.model('Devices');

router.get('/device/:id', (req, res) => {
    Devices.findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.deviceId);
    });
});