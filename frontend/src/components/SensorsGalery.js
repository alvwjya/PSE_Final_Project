import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import './SensorsGalery.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const apiAC = axios.create({
    baseURL: 'http://3.140.211.108/ac'
})

const apiLamp = axios.create({
    baseURL: 'http://3.140.211.108/lamp'
})


const SensorsGalery = () => {

    const [RoomTemp, setRoomTemp] = useState("")
    const [RoomHumidity, setRoomHumidity] = useState("")
    const [RoomBrightness, setRoomBrightness] = useState("")
    const [RoomMotion, setRoomMotion] = useState("")

    const [ACFan, setACFan] = useState(1)
    const [ACTemperature, setACTemperature] = useState(18)


    apiAC.get('/').then(
        (response) => {
            //console.log(response)
            setRoomTemp(response.data["Room Temp"])
            setRoomHumidity(response.data["Room Humidity"])
        }
    )

    apiLamp.get('/').then(
        (response) => {
            //console.log(response)
            setRoomBrightness(response.data["Room Brightness"])
            setRoomMotion(response.data["Room Motion"])
        }
    )

    const setBrightValue = () => {
        if (RoomBrightness == 1) {
            return "Dark"
        }
        else {
            return "Bright"
        }
        
    }

    const setMotionValue = () => {
        if (RoomMotion == 0) {
            return "No movement"
        }
        else {
            return "There is a movement"
        }
    }

    const settingsLampOff = () => {
        const datasLamp = {
            "alvianLampPower": "0"
        };

        axios.post("http://3.140.211.108/setlamppower", datasLamp)
            .then((response) => {
                console.log(response.status);
            })
    }

    const settingsLampOn = () => {
        const datasLamp = {
            "alvianLampPower": "1"
        };

        axios.post("http://3.140.211.108/setlamppower", datasLamp)
            .then((response) => {
                console.log(response.status);
            })
    }


    //CODE RELATED WITH AC

    const setACTempUp = () => {
        if (ACTemperature >= 32) {
            return;
        }
        return setACTemperature(ACTemperature + 1)
    }

    const setACTempDown = () => {
        if (ACTemperature <= 18) {
            return;
        }
        return setACTemperature(ACTemperature - 1)
    }

    const setACFanUp = () => {
        if (ACFan >= 4) {
            return;
        }
        return setACFan(ACFan + 1)

    }

    const setACFanDown = () => {
        if (ACFan <= 1) {
            return;
        }
        return setACFan(ACFan - 1)
    }

    const settingsACOn = () => {
        const datasAC = {
            "alvianAirConPower": "1"
        };

        axios.post("http://3.140.211.108/setacpower", datasAC)
            .then((response) => {
                console.log(response.status);
            })
    }

    const settingsACOff = () => {
        const datasAC = {
            "alvianAirConPower": "0"
        };

        axios.post("http://3.140.211.108/setacpower", datasAC)
            .then((response) => {
                console.log(response.status);
            })
    }

    const settingsACTemp = () => {
        const datasACTemp = {
            "alvianAirConTemp": String(ACTemperature)
        };

        axios.post("http://3.140.211.108/setactemp", datasACTemp)
            .then((response) => {
                console.log(response.status);
                console.log(ACTemperature);
            })

    }

    const settingsACFan = () => {

        const datasACFan = {
            "alvianAirConFan": String(ACFan)
        };

        axios.post("http://3.140.211.108/setacfan", datasACFan)
            .then((response) => {
                console.log(response.status);
                console.log(ACFan);
            })


    }




    return (
        <>
            <Navbar />
            <div className="container-fluid bg-dark text-light">
                <div className="title-header">
                    <h2 className="text-center header ml-3 p-2">Sensors:</h2>
                </div>
                <div className="row d-flex justify-content-center p-4">
                    <div className='col-md-4 cardAC'>
                        <div className="card ml-3 p-2 bg-dark">
                            <div className="card-body">
                                <h5 className="card-title">AC</h5>
                                <p className="card-text mx-0 px-0">This is AC</p>
                                <p className="text p-0">Room Temperature: {RoomTemp} </p>
                                <p className="text p-0">Room Humidity: {RoomHumidity}</p>
                                <p className="card-text mx-0 px-0">Type: AC</p>
                                <div className="container-button">
                                    <button className="btn btn-primary turn-button" onClick={settingsACOn.bind(this)}>Turn on</button>
                                    <button className="btn btn-primary turn-button" onClick={settingsACOff.bind(this)}>Turn off</button>
                                </div>

                                <div className="container-button mt-3">
                                    <span className="text-temp">Temperature: </span>
                                    <button className="btn bi bi-dash-circle button-temp" onClick={setACTempDown.bind(this)}>{ACTemperature}</button>
                                    <button className="btn bi bi-plus-circle button-temp" onClick={setACTempUp.bind(this)}></button>
                                    <button className="btn btn-primary turn-button" onClick={settingsACTemp.bind(this)}>Set </button>

                                </div>

                                <div className="container-button mt-3">
                                    <span className="text-fan">Fan: </span>
                                    <button className="btn bi bi-dash-circle button-temp" onClick={setACFanDown.bind(this)}>{ACFan}</button>
                                    <button className="btn bi bi-plus-circle button-temp" onClick={setACFanUp.bind(this)}></button>
                                    <button className="btn btn-primary turn-button" onClick={settingsACFan.bind(this)}>Set</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 cardLamp'>
                        <div className="card ml-3 p-2 bg-dark">
                            <div className="card-body">
                                <h5 className="card-title">Lamp</h5>
                                <p className="card-text mx-0 px-0">This is Lamp</p>
                                <p className="text p-0">Room Brightness: {setBrightValue()} </p>
                                <p className="text p-0">Room Motion: {setMotionValue()}</p>
                                <p className="card-text mx-0 px-0">Type: Lamp</p>
                                <div className="container-button">
                                    <button className="btn btn-primary turn-button" onClick={settingsLampOn.bind(this)}>Turn on</button>
                                    <button className="btn btn-primary turn-button" onClick={settingsLampOff.bind(this)}>Turn off</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}

export default SensorsGalery; 
