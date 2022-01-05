const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: Number,
        required: true
    },
    roomName: {
        type: String,
        required: true
    }
});

mongoose.model("Rooms", roomSchema);