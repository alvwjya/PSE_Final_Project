import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import './SensorsGalery.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const apiAC = axios.create({
    baseURL: 'http://localhost:4000/ac'
})

const apiLamp = axios.create({
    baseURL: 'http://localhost:4000/Lamp'
})


const SensorsGalery = () => {

    const [RoomTemp, setRoomTemp] = useState("")
    const [RoomHumidity, setRoomHumidity] = useState("")
    const [RoomBrightness, setRoomBrightness] = useState("")
    const [RoomMotion, setRoomMotion] = useState("")
    const [LampPower, setLampPower] = useState("")
    const [ACPower, setACPower] = useState("")
    const [ACFan, setACFan] = useState(1)
    const [ACTemperature, setACTemperature] = useState(25)


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
        if (RoomBrightness == 0) {
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

    const setLampOn = () => {
        return setLampPower("1");
    }

    const setLampOff = () => {
        return setLampPower("0");
    }

    const settingsLamp = () => {
        const datasLamp = {
            "alvianLampPower" : LampPower
        };

        axios.post("http://localhost:4000/setlamppower", datasLamp)
        .then((response) => {
            console.log(response.status);
        })
    }

    const setACOn = () => {
        return setACPower("1");
    }

    const setACOff = () => {
        return setACPower("0");
    }

    const setACFanUp = () => {
        return setACFan(ACFan + 1)

    }

    const setACFanDown = () => {
        return setACFan(ACFan-1)
    }

    const setACTempUp = () => {
        return setACTemperature(ACTemperature+1)
    }

    const setACTempDown = () => {
        return setACTemperature(ACTemperature-1)
    }



    const settingsAC = () => {
        const datasACPower = {
            "alvianAirConPower" : ACPower
        };
        const datasACFan = {
        "alvianAirConFan" : ACFan};

        const datasACTemp = {
        "alvianAirConTemp": ACTemperature};

        axios.post("http://localhost:4000/setACpower", datasACPower)
        .then((response) => {
            console.log(response.status);
        })

        axios.post("http://localhost:4000/setacfan", datasACFan)
        .then((response) => {
            console.log(response.status);
        })

        axios.post("http://localhost:4000/setactemp", datasACTemp)
        .then((response) => {
            console.log(response.status);
        })
    }




    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="title-header">
                    <h2 className="text-start header ml-3 p-2">Sensors:</h2>
                </div>

                <div className="row">
                    <div className='col-md-6'>
                        <div className="card ml-3 p-2">
                            <div className="card-body">
                                <h5 className="card-title">AC</h5>
                                <p className="card-text mx-0 px-0">This is AC</p>
                                <p className="text p-0">Room Temperature: {RoomTemp} </p>
                                <p className="text p-0">Room Humidity: {RoomHumidity}</p>
                                <p className="card-text mx-0 px-0">Type: AC</p>
                                <div className="container-button">
                                    <button className="btn btn-primary turn-button" onClick={setACOn.bind(this)}>Turn on</button>
                                    <button className="btn btn-primary turn-button" onClick={setACOff.bind(this)}>Turn off</button>
                                </div>
                               
                                <div className="container-button mt-3">
                                    <span className="text-temp">Temperature: </span>
                                    <button className="btn bi bi-dash-circle button-temp" onClick={setACTempDown.bind(this)}></button>
                                    <button className="btn bi bi-plus-circle button-temp" onClick={setACTempUp.bind(this)}></button>
                                </div>

                                <div className="container-button mt-3">
                                    <span className="text-fan">Fan: </span>
                                    <button className="btn bi bi-dash-circle button-temp" onClick={setACFanDown.bind(this)}></button>
                                    <button className="btn bi bi-plus-circle button-temp" onClick={setACFanUp.bind(this)}></button>
                                </div>
                                <p>{ACFan}</p>
                                <div class="text-center mx-auto">
                                    <button className='btn btn-primary turn-button' onClick={settingsAC.bind(this)}>Set</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="card ml-3 p-2">
                            <div className="card-body">
                                <h5 className="card-title">Sensors Name</h5>
                                <p className="card-text mx-0 px-0">Sensors Description</p>
                                <p className="text p-0">Room Brightness: {setBrightValue()} </p>
                                <p className="text p-0">Room Motion: {setMotionValue()}</p>
                                <p className="card-text mx-0 px-0">Type: Lamp</p>
                                <div className="container-button">
                                    <button className="btn btn-primary turn-button" onClick={setLampOn.bind(this)}>Turn on</button>
                                    <button className="btn btn-primary turn-button" onClick={setLampOff.bind(this)}>Turn off</button>
                                </div>
                                <div class="text-center mx-auto">
                                    <button className='btn btn-primary turn-button' onClick={settingsLamp.bind(this)}>Set</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-button-add">
                        <div className="text-center m-4 p-2">
                            <Link to="/">
                                <button className="btn btn-primary btn-footer p-2" href="/" role="button">
                                    Back
                                </button>
                            </Link>
                            <Link to="/AddSensors">
                                <button className="btn btn-primary btn-footer p-2" href="/AddSensors" role="button">
                                    Add Sensors
                                </button>
                            </Link>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )

}

export default SensorsGalery; 
