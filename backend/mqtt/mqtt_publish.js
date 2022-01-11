const mqtt = require('mqtt');
const address = "mqtt://broker.mqtt-dashboard.com";

class MqttPublish {
    constructor() {
        this.client = mqtt.connect(address);

        this.client.on("connect", function() {
            client.publish('alvianAirConPower', 'Power');
            client.publish('alvianAirConTemp', 'AC temperature is');
            client.publish('alvianAirConFan', 'AC fan level is');
        })
    }
}

module.exports = new MqttPublish();