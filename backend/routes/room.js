const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rooms = mongoose.model('Rooms');
require('../models/rooms');

const addRoom = async (req, res) => {
    const room = new Rooms(req.body);
    try {
        const addedRoom = await room.save();
        res.status(201).json(addedRoom);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

router.get('/room', getRooms);
router.post('/room', addRoom);

module.exports = router;