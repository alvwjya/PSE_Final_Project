const mqtt = require('mqtt');

class MqttClient {
    constructor() {
        this.checkEnvironmentVariables();
        console.log(`[MqttClient] Connecting to MQTT.. ${process.env.MQTT_ADDRESS}`);
    }

    onMqttConnect = () => {
        console.log(`[MqttClient] Connected to ${process.env.MQTT_ADDRESS}`);
    }

    onMqttMessageReceived = (topic, message) => {
        console.log(`[MqttClient] Received data from topic '${topic}' with value '${message}'`);
        
    }

    onClientSubscribe = (err) => {
        if (err) throw err;
        console.log("[MqttClient] Subscribe successful.")
    }

    checkEnvironmentVariables = () => {

    }
}

module.exports = new MqttClient();