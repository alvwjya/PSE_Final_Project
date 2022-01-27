# Smart Home Using NodeMCU
Final Project Pervasive Software Engineering

![topLanguage](https://img.shields.io/github/languages/top/alviancode/PSE_Final_Project)
![commit](https://img.shields.io/github/last-commit/alviancode/PSE_Final_Project)
![license](https://img.shields.io/github/license/alviancode/PSE_Final_Project)

## Installation
### Backend
For the backend, we are using ExpressJS as the library. You can run `npm start` to start the application. The application will run on port `4000` by default and you can change it in the `app.js`

```
const port = process.env.PORT || <desired port>;
```

### Frontend
For the frontend, we are using ReactJS as the library with the help of bootstrap. To run the application, you can run the application with `npm start` and the default port for the frontend is `3000`.

### Arduino
For this project, you will need to use two NodeMCUs. One for controlling the AC, and the other for the light. You need to adjust several attributes as stated below.

- Smart Light Controler
  
  ```
  const char *ssid = <Your WiFi name>;
  const char *password = <Your WiFi password>;
  const char *mqtt_server = <Your MQTT broker link>;

  char *roomTemp = <Topic for room temp>;
  char *roomHumid = <Topic for room humidity>;
  char *acPower = <Topic for AC power>;
  char *acTemp = <Topic for AC temperature>;
  char *acFan = <Topic for AC fan>;
  ```

- Smart AIr Conditioner Controler
  ```
  const char *ssid = <Your WiFi name>;
  const char *password = <Your WiFi password>;
  const char *mqtt_server = <Your MQTT broker link>;
  
  char *roomBrightness = <Topic for room brightness>;
  char *roomMotion = <Topic for room motion>;
  char *lampPower = <Topic for controlling lamp power>;
  ```


## Components
- NodeMcu = 2
- Temperature and Humidity Sensor = 1
- Light Sensor = 1
- Motion Sensor = 1
- Relay = 1
- Lithium Ion 18650 = 2
- Lithium Ion Charge Controller = 2
- IR LED = 1
- Resistor (Use according to you LED Specs) = 1


## Poster

<p align="center">
<img src="https://raw.githubusercontent.com/alviancode/PSE_Final_Project/main/PSE Poster.png" height="600">
</p>