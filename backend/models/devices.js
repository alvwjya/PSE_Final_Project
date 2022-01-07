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
    topic: {
        type: Object,
        required: true
    }
});

mongoose.model("Devices", deviceSchema);