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
        type: Array,
        default: ['alvianRoomTemperature', 'alvianAirConPower', 'alvianAirConTemp', 'alvianAirConFan']
    }
});

mongoose.model("Devices", deviceSchema);