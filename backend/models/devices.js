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
    roomId: {
        type: Number,
        required: true
    }
});

mongoose.model("Devices", deviceSchema);