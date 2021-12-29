const mqtt = require('mqtt');

class MqttClient {
    constructor() {
        this.checkEnvironmentVariables();
        console.log(`[MqttClient] Connecting to MQTT.. ${process.env.MQTT_ADDRESS}`);
        this.client = mqtt.connect(process.env.MQTT_ADDRESS);
        this.client.on('connect', this.onMqttConnect);
        this.client.on('message', this.onMqttMessageReceived);
        this.onMessageReceivedCallbacks = [];
    }

    onMqttConnect = () => {
        console.log(`[MqttClient] Connected to ${process.env.MQTT_ADDRESS}`);
    }

    onMqttMessageReceived = (topic, message) => {
        console.log(`[MqttClient] Received data from topic '${topic}' with value '${message}'`);
        this.onMessageReceivedCallbacks.forEach(callback => {
            if (callback) callback(`${topic}`, `${message}`);
        });
    }

    onClientSubscribe = (err) => {
        if (err) throw err;
        console.log("[MqttClient] Subscribe successful.")
    }

    checkEnvironmentVariables = () => {
        if (!process.env.MQTT_ADDRESS) throw new Error("Missing environment variable 'MQTT_ADDRESS'");
    }
}

module.exports = new MqttClient();