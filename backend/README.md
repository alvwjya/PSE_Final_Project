# PSE Final Project Backend
To run the backend of the project, you can run
### `npm start`
The backend will run on port 4000.
As the backend runs, 4 MQTT clients will connect and subscribe to the device topics.</br>
## Routes
Users can get data from the devices.</br>
The endpoint `/ac` will return room temperature and room humidity.</br>
The endpoint `/lamp` will return room brightness and room motion.</br>
</br>
Users can send data to the devices to change its state.</br>
The endpoint `/setac` can be used to set AC power, AC temperature and AC fan with the input:</br>
`{`</br>`
  "alvianAirConPower": "x",
 }`
