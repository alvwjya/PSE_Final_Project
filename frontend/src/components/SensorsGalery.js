import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import './SensorsGalery.css';
import { Link } from 'react-router-dom';
import axios from "axios";



const SensorsGalery = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/ac')
            .then(response => {
                setData(response.data)
                console.log(data)
            })
            .catch(error => {
                console.log("Error getting the data", error);
            })
    })
    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="title-header">
                    <h2 className="text-start header ml-3 p-2">Sensors:</h2>
                </div>
                <div className="container-room-description ml-3 p-2">
                    <p className="text p-0">Room Temperature: </p>
                    <p className="text p-0">Humidity: x</p>
                </div>

                <div className="row">


                    <div className='col-md-4'>
                        <div className="card ml-3 p-2">
                            <div className="card-body">
                                <h5 className="card-title">Lamp</h5>
                                <p className="card-text mx-0 px-0">This is Lamp</p>
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





                    <div className='col-md-4'>
                        <div className="card ml-3 p-2">
                            <div className="card-body">
                                <h5 className="card-title">Sensors Name</h5>
                                <p className="card-text mx-0 px-0">Sensors Description</p>
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
