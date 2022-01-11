const mqtt = require('mqtt');
const address = "mqtt://broker.mqtt-dashboard.com";
class MqttClient {
    constructor() {
        console.log('[MqttClient] Connecting to MQTT..');
        this.client = mqtt.connect(address);
        this.client.on('connect', function() {
            this.client.subscribe('alvianRoomTemperature');
            console.log('Subscribe room temp successful');

            this.client.subscribe('alvianRoomHumidity');
            console.log('Subscribe room humidity successful');
        });

        this.client.on('message', function(topic, message) {
            console.log(message.toString());
        });

        //this.onMessageReceivedCallbacks = [];
    }

}

module.exports = new MqttClient();