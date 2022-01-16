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
  "alvianAirConPower": "x",`</br>
  `"alvianAirConTemp": "y",`</br>
  `"alvianAirConFan": "z"`</br>
`}`</br>
with `x` is `"0"` (off) or `"1"` (on),</br>
`y` is `"18"` to `"32"` as the temperature,</br>
and `z` is `"1"` to `"4"` as the fan.</br>
When the process is successful, it will return `AC state changed` message.</br>
</br>
The endpoint `/setlamp` can be used to set lamp power with the input:</br>
`{`</br>`
  "alvianLampPower": "x"`</br>
`}`</br>
with `x` is `"0"` (off) or `"1"` (on).</br>
When the process is successful, it will return `Lamp state changed` message.</br>
