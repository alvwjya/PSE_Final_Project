const mqtt = require('mqtt');
const address = "mqtt://broker.mqtt-dashboard.com";


client = mqtt.connect(address);

client.on("connect", function() {
    //client.publish('alvianAirConPower', 'Power');
    //client.publish('alvianAirConTemp', 'AC temperature is');
    //client.publish('alvianAirConFan', 'AC fan level is');
    //client.publish('alvianLampPower', 'Lamp power');
    //client.publish('alvianRoomTemperature', 'room temp');
});


//module.exports = new MqttPublish();