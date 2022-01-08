import Devices from '../models/devices';

export const addDevice = async (req, res) => {
    const device = new Devices(req.body);
    try {
        const addedDevice = await device.save();
        res.status(201).json(addedDevice);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getDevices = async (req, res) => {
    try {
        const devices = await Devices.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}