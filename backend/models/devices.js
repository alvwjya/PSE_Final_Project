const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceName: {
        type: String,
        required: true
    },
    deviceId: {
        type: Number,
        required: true
    },
    //Purpose is for "ac" or "lamp"
    purpose: {
        type: String,
        required: true
    }
});

mongoose.model("Devices", deviceSchema);