#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>
#include <ir_Daikin.h>
#include <dht.h>

#define dhtPin D3
//#define irLed D2

const uint16_t irLed = 4;

dht DHT;
IRDaikinESP ac(irLed); // Set the GPIO to be used to sending the message

//Updates with values suitable for your network
const char *ssid = "Alice_Chonky";
const char *password = "s!b3rianHusky";
const char *mqtt_server = "18.220.209.95";

char *roomTemp = "alvianRoomTemperature";
char *roomHumid = "alvianRoomHumidity";
char *acPower = "alvianAirConPower";
char *acTemp = "alvianAirConTemp";
char *acFan = "alvianAirConFan";

String tempStr;
String humidStr;
char temp[50];
char humid[50];
unsigned long lastMsg = 0;

void callback(char *topic, byte *payload, unsigned int length);

WiFiClient wifiClient;

PubSubClient client(mqtt_server, 1883, callback, wifiClient);

void setup()
{
  ac.begin();

  //Initialize the light as an output and set to LOW (off)
  pinMode(BUILTIN_LED, OUTPUT);
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

void loop()
{
  void reconnect();
  //reconnect if connection is lost
  if (!client.connected() && WiFi.status() == 3)
  {
    reconnect();
  }

  //maintain MQTT connection
  client.loop();

  //MUST delay to allow ESP8266 WIFI functions to run
  delay(10);

  unsigned long now = millis();
  if (now - lastMsg > 5000)
  {
    lastMsg = now;
    DHT.read11(dhtPin);
    int tempS = DHT.temperature;
    int humidS = DHT.humidity;

    tempStr = String(tempS);
    tempStr.toCharArray(temp, tempStr.length() + 1);

    humidStr = String(humidS);
    humidStr.toCharArray(humid, humidStr.length() + 1);

    client.publish(roomTemp, temp);
    client.publish(roomHumid, humid);
  }
}

void callback(char *topic, byte *payload, unsigned int length)
{
  //convert topic to string to make it easier to work with
  String topicStr = topic;

  //Print out some debugging info
  Serial.println("Callback update.");
  Serial.print("Topic: ");
  Serial.println(topic);

  if (strcmp(topic, acPower) == 0)
  {
    //turn the light on if the payload is '1' and publish to the MQTT server a confirmation message
    if (payload[0] == '1')
    {
      digitalWrite(BUILTIN_LED, LOW);
      Serial.println("AC HIDUP");
      //client.publish(acPower, "AcOn");
      turnOn();
    }

    //turn the light off if the payload is '0' and publish to the MQTT server a confirmation message
    else if (payload[0] == '0')
    {
      digitalWrite(BUILTIN_LED, HIGH);
      Serial.println("AC MATI");
      //client.publish(acPower, "AcOff");
      turnOff();
    }
  }

  else if (strcmp(topic, acTemp) == 0)
  {
    Serial.print("AC Temp: ");
    payload[length] = '\0';
    String myString = String((char *)payload);
    int getVal = myString.toInt();
    Serial.print(getVal);
    changeTemp(getVal);
  }

  else if (strcmp(topic, acFan) == 0)
  {
    Serial.print("AC Fan: ");
    payload[length] = '\0';
    String myString = String((char *)payload);
    int getVal = myString.toInt();
    Serial.print(getVal);
    changeFan(getVal);
  }
}

//generate unique name from MAC addr
String macToStr(const uint8_t *mac)
{
  String result;

  for (int i = 0; i < 6; ++i)
  {
    result += String(mac[i], 16);

    if (i < 5)
    {
      result += ':';
    }
  }

  return result;
}

void reconnect()
{
  //attempt to connect to the wifi if connection is lost
  if (WiFi.status() != WL_CONNECTED)
  {
    //debug printing
    Serial.print("Connecting to ");
    Serial.println(ssid);

    //loop while we wait for connection
    while (WiFi.status() != WL_CONNECTED)
    {
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
  if (WiFi.status() == WL_CONNECTED)
  {
    // Loop until we're reconnected to the MQTT server
    while (!client.connected())
    {
      Serial.print("Attempting MQTT connection...");

      // Generate client name based on MAC address and last 8 bits of microsecond counter
      String clientName;
      clientName += "esp8266-";
      uint8_t mac[6];
      WiFi.macAddress(mac);
      clientName += macToStr(mac);

      //if connected, subscribe to the topic(s) we want to be notified about
      if (client.connect((char *)clientName.c_str()))
      {
        Serial.print("\tMQTT Connected");
        client.subscribe(acPower);
        client.subscribe(acTemp);
        client.subscribe(acFan);
      }

      //otherwise print failed for debugging
      else
      {
        Serial.println("\tFailed.");
        abort();
      }
    }
  }
}

void turnOn()
{
  ac.on();
  ac.setFan(1);
  ac.setMode(kDaikinCool);
  ac.setTemp(25);
  ac.setSwingVertical(false);

#if SEND_DAIKIN
  ac.send();
#endif
}

void turnOff()
{
  ac.off();

#if SEND_DAIKIN
  ac.send();
#endif
}

void changeTemp(int temp)
{
  ac.on();
  ac.setMode(kDaikinCool);
  ac.setTemp(temp);
  ac.setSwingVertical(false);

#if SEND_DAIKIN
  ac.send();
#endif
}

void changeFan(int fan)
{
  ac.on();
  ac.setFan(fan);
  ac.setMode(kDaikinCool);
  ac.setSwingVertical(false);

#if SEND_DAIKIN
  ac.send();
#endif
}
