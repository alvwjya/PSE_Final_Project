import Rooms from '../models/rooms';

export const addRoom = async (req, res) => {
    const room = new Rooms(req.body);
    try {
        const addedRoom = await room.save();
        res.status(201).json(addedRoom);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}