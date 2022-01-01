import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import './SensorsGalery.css';
import {Link} from 'react-router-dom';
import $ from "jquery";

const SensorsGalery = () => {
    $.getJSON('./sensors.json', function (data) {
        let sensors = data.sensors;
        console.log(sensors);
            });
    return (
        <>
        <Navbar/>
        <div className="container-fluid">
        <div className="title-header">
            <h2 className="text-start header ml-3 p-2">Sensors:</h2>
        </div>
        <div className="container-room-description ml-3 p-2">
            <p className="text p-0">Room Temperature: x</p>
            <p className="text p-0">Humidity: x</p>
        </div>

            <div className="row">
                <div className='col-md-4'>
                    <div className="card ml-3 p-2">
                        <div className="card-body">
                            <h5 className="card-title">Sensors Name</h5>
                            <p className="card-text mx-0 px-0">Sensors Description</p>
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
                    <div className ="text-center m-4 p-2">
                        <Link to="/">
                            <button className ="btn btn-primary btn-footer p-2" href="/" role="button">
                                Back
                            </button>
                        </Link>
                        <Link to="/AddSensors">
                            <button className ="btn btn-primary btn-footer p-2" href="/AddSensors" role="button">
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
