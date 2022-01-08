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

        //Subscribe topics
        console.log(`[MqttClient] Subscribing to topic ${'alvianRoomTemperature'}`);
        this.client.subscribe('alvianRoomTemperature', err => this.onClientSubscribe(err));

        console.log(`[MqttClient] Subscribing to topic ${'alvianRoomHumidity'}`);
        this.client.subscribe('alvianRoomHumidity', err => this.onClientSubscribe(err));

        console.log(`[MqttClient] Subscribing to topic ${process.env.roomBrightness}`);
        this.client.subscribe(process.env.roomBrightness, err => this.onClientSubscribe(err));

        console.log(`[MqttClient] Subscribing to topic ${process.env.roomMotion}`);
        this.client.subscribe(process.env.roomMotion, err => this.onClientSubscribe(err));
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
        if (!process.env.roomTemp) throw new Error("Missing environment variable 'roomTemp'");
        if (!process.env.roomHumid) throw new Error("Missing environment variable 'roomHumid'");
        if (!process.env.roomBrightness) throw new Error("Missing environment variable 'roomBrightness'");
        if (!process.env.roomMotion) throw new Error("Missing environment variable 'roomMotion'");
    }
}

//module.exports = new MqttClient();