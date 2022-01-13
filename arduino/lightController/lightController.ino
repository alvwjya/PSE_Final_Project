#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Arduino.h>

#define motionSensor D1
#define lightSensor D2
#define lightSwitch D3


//Updates with values suitable for your network
const char* ssid = "Alice_Chonky";
const char* password = "s!b3rianHusky";
const char* mqtt_server = "broker.mqtt-dashboard.com";

char* roomBrightness = "alvianRoomBrightness";
char* roomMotion = "alvianRoomMotion";
char* lampPower = "alvianLampPower";

String lightStr;
String motionStr;
char light[50];
char motion[50];
unsigned long lastMsg = 0;

void callback(char* topic, byte* payload, unsigned int length);

WiFiClient wifiClient;

PubSubClient client(mqtt_server, 1883, callback, wifiClient);


void setup() {
  //Initialize the light as an output and set to LOW (off)
  pinMode(BUILTIN_LED, OUTPUT);
  pinMode(motionSensor, INPUT);
  pinMode(lightSensor, INPUT);
  pinMode(lightSwitch, OUTPUT);

  digitalWrite(BUILTIN_LED, HIGH);
  

  //Start the serial line for debugging
  Serial.begin(115200);
  delay(100);

  void reconnect();

  //start wifi subsystem
  WiFi.begin(ssid, password);
  //attempt to connect to the WIFI network and then connect to the MQTT server
  reconnect();

  //wait a bit before starting the main loop
  delay(2000);
}

void loop() {
  void reconnect();
  //reconnect if connection is lost
  if (!client.connected() && WiFi.status() == 3) {
    reconnect();
  }

  //maintain MQTT connection
  client.loop();

  //MUST delay to allow ESP8266 WIFI functions to run
  delay(10);

  unsigned long now = millis();
  if (now - lastMsg > 5000 * 1) {
    lastMsg = now;

    int motionValue = digitalRead(motionSensor);
    int lightValue = digitalRead(lightSensor);

    motionStr = String(motionValue);
    motionStr.toCharArray(motion, motionStr.length() + 1);

    lightStr = String(lightValue);
    lightStr.toCharArray(light, lightStr.length() + 1);

    client.publish(roomMotion, motion);
    client.publish(roomBrightness, light);
  }
}


void callback(char* topic, byte* payload, unsigned int length) {

  //convert topic to string to make it easier to work with
  String topicStr = topic;

  //Print out some debugging info
  Serial.println("Callback update.");
  Serial.print("Topic: ");
  Serial.println(topic);


  if (strcmp(topic, lampPower) == 0) {

    //turn the light on if the payload is '1' and publish to the MQTT server a confirmation message
    if (payload[0] == '1') {
      digitalWrite(BUILTIN_LED, LOW);
      digitalWrite(lightSwitch, LOW);
      Serial.println("LAMPU HIDUP");
      client.publish(lampPower, "lightOn");
    }

    //turn the light off if the payload is '0' and publish to the MQTT server a confirmation message
    else if (payload[0] == '0') {
      digitalWrite(BUILTIN_LED, HIGH);
      digitalWrite(lightSwitch, HIGH);
      Serial.println("LAMPU MATI");
      client.publish(lampPower, "lightOff");
    }
  }
}


//generate unique name from MAC addr
String macToStr(const uint8_t* mac) {

  String result;

  for (int i = 0; i < 6; ++i) {
    result += String(mac[i], 16);

    if (i < 5) {
      result += ':';
    }
  }

  return result;
}


void reconnect() {
  //attempt to connect to the wifi if connection is lost
  if (WiFi.status() != WL_CONNECTED) {
    //debug printing
    Serial.print("Connecting to ");
    Serial.println(ssid);

    //loop while we wait for connection
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }

    //print out some more debug once connected
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }

  //make sure we are connected to WIFI before attemping to reconnect to MQTT
  if (WiFi.status() == WL_CONNECTED) {
    // Loop until we're reconnected to the MQTT server
    while (!client.connected()) {
      Serial.print("Attempting MQTT connection...");

      // Generate client name based on MAC address and last 8 bits of microsecond counter
      String clientName;
      clientName += "esp8266-";
      uint8_t mac[6];
      WiFi.macAddress(mac);
      clientName += macToStr(mac);

      //if connected, subscribe to the topic(s) we want to be notified about
      if (client.connect((char*) clientName.c_str())) {
        Serial.print("\tMQTT Connected");
        client.subscribe(lampPower);
      }

      //otherwise print failed for debugging
      else {
        Serial.println("\tFailed.");
        abort();
      }
    }
  }
}
