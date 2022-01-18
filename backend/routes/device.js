const express = require('express');
const router = express.Router();

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

clientTemp.on('connect', function () {
    clientTemp.subscribe('alvianRoomTemperature');
    console.log('Subscribe room temp successful');
});

clientHumidity.on('connect', function () {
    clientHumidity.subscribe('alvianRoomHumidity');
    console.log('Subscribe room humidity successful');
});

clientBright.on('connect', function () {
    clientBright.subscribe('alvianRoomBrightness');
    console.log('Subscribe room brightness successful');
});

clientMotion.on('connect', function () {
    clientMotion.subscribe('alvianRoomMotion');
    console.log('Subscribe room motion successful');
});

//---Message---

clientTemp.on('message', function (topic, message) {
    msgTemp = message.toString();
});

clientHumidity.on('message', function (topic, message) {
    //console.log(message.toString());
    msgHumid = message.toString();
});

clientBright.on('message', function (topic, message) {
    //console.log(message.toString());
    msgBright = message.toString();
});

clientMotion.on('message', function (topic, message) {
    //console.log(message.toString());
    msgMotion = message.toString();
});

// ---------- END OF MQTT ------------


router.post("/setacpower", (req, res) => {
    const { alvianAirConPower } = req.body;
    if (!alvianAirConPower) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (!(alvianAirConPower == 0 || alvianAirConPower == 1)) {
        return res.status(422).json({ error: "Invalid value" });
    }

    publishSetAC.publish("alvianAirConPower", alvianAirConPower);
    return res.status(200).json({ message: alvianAirConPower });
})


router.post("/setactemp", (req, res) => {
    const { alvianAirConTemp } = req.body;

    if (!alvianAirConTemp) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (!(alvianAirConTemp >= 18 && alvianAirConTemp <= 32)) {
        return res.status(422).json({ error: "Invalid value" });
    }

    publishSetAC.publish("alvianAirConPower", alvianAirConTemp);
    console.log(alvianAirConTemp)
    return res.status(200).json({ message: alvianAirConTemp });
})


router.post("/setacfan", (req, res) => {
    const { alvianAirConFan } = req.body;

    if (!alvianAirConFan) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (!(alvianAirConFan >= 1 && alvianAirConFan <= 4)) {
        return res.status(422).json({ error: "Invalid value" });
    }

    publishSetAC.publish("alvianAirConFan", alvianAirConFan);
    console.log(alvianAirConFan)
    return res.status(200).json({ message: alvianAirConFan });
})


router.post("/setlamppower", (req, res) => {
    const { alvianLampPower } = req.body;

    if (!alvianLampPower) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    if (!(alvianLampPower == 0 || alvianLampPower == 1)) {
        return res.status(422).json({ error: "Invalid value" });
    }

    publishSetLamp.publish("alvianLampPower", alvianLampPower);
    return res.status(200).json({ message: alvianLampPower });
})


router.get("/ac", (req, res) => {
    try {
        res.status(200).json({
            'Room Temp': msgTemp,
            'Room Humidity': msgHumid
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/lamp", (req, res) => {
    try {
        res.status(200).json({
            'Room Brightness': msgBright,
            'Room Motion': msgMotion
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
