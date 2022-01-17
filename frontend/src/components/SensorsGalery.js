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
            return "Light"
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
                                    <a href="#" className="btn btn-primary turn-button">Turn on</a>
                                    <a href="#" className="btn btn-primary turn-button">Turn off</a>
                                </div>

                                <div className="container-button mt-3">
                                    <span className="text-temp">Temperature: </span>
                                    <a href="#" className="btn bi bi-dash-circle button-temp"></a>
                                    <a href="#" className="btn bi bi-plus-circle button-temp"></a>
                                </div>

                                <div className="container-button mt-3">
                                    <span className="text-fan">Fan: </span>
                                    <a href="#" className="btn bi bi-dash-circle button-temp"></a>
                                    <a href="#" className="btn bi bi-plus-circle button-temp"></a>
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
                                    <a href="#" className="btn btn-primary turn-button">Turn on</a>
                                    <a href="#" className="btn btn-primary turn-button">Turn off</a>
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
