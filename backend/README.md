# PSE Final Project Backend
To run the backend of the project, you can run `npm start`

The backend will run on port 4000.
As the backend runs, 4 MQTT clients will connect and subscribe to the device topics.</br>
## Routes

### How to get data from devices:

- The endpoint `/ac` will return room temperature and room humidity.

- The endpoint `/lamp` will return room brightness and room motion.

### How to send data to devices:
- The endpoint `/setacpower` can be used to set AC power with the input:
  ```
  {
    "alvianAirConPower" : "value"
  }
  ```
  Where `x == 1` to turn on the AC, or `x == 0` to turn of the AC.


- The endpoint `/setactemp` can be used to set AC temperature with the input:
  ```
  {
    "alvianAirConTemp" = "x"
  }
  ```
  Where `x` raging from `18` to `32`


- The endpoint `/setacfan` can be used to set AC fan with the input:
  ```
  {
   "alvianIrConFan" : "x"
  }
  ```

  Where `x` rangine from `1` to `4`


- The endpoint `/setlamppower` can be used to set lamp power with the input:
  ```
  {
    "alvianLampPower" : "x"
  }
  ```

  Where `x == 1` to turn on the lamp, or `x == 0` to turn off the lamp. 
