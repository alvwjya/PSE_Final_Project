const mqtt = require('mqtt');
const address = "mqtt://broker.mqtt-dashboard.com";

console.log('[MqttClient] Connecting to MQTT..');
var client = mqtt.connect(address);
client.on('connect', function() {
    client.subscribe('alvianRoomTemperature');
    console.log('Subscribe room temp successful');

    client.subscribe('alvianRoomHumidity');
    console.log('Subscribe room humidity successful');
});

client.on('message', function(topic, message) {
    console.log(message.toString());
});



//module.exports = new MqttClient();