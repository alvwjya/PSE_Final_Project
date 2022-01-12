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

clientTemp.on('connect', function() {
    client.subscribe('alvianRoomTemperature');
    console.log('Subscribe room temp successful');
});

clientHumidity.on('connect', function() {
    client.subscribe('alvianRoomHumidity');
    console.log('Subscribe room humidity successful');
})

clientBright.on('connect', function() {
    client.subscribe('alvianRoomBrightness');
    console.log('Subscribe room brightness successful');
});

clientMotion.on('connect', function() {
    client.subscribe('alvianRoomMotion');
    console.log('Subscribe room motion successful');
});

//---Message---

clientTemp.on('message', function(topic, message) {
    console.log(message.toString());
    msgTemp = message.toString();
});

clientHumidity.on('message', function(topic, message) {
    console.log(message.toString());
    msgHumid = message.toString();
});

clientBright.on('message', function(topic, message) {
    console.log(message.toString());
    msgBright = message.toString();
});

clientMotion.on('message', function(topic, message) {
    console.log(message.toString());
    msgMotion = message.toString();
});

//module.exports = new MqttClient();