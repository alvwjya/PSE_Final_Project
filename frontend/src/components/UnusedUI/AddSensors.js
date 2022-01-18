import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar';
import './AddSensors.css';


const AddSensors = () => {

    const [sensorName, setSensorName] = useState();
    const [sensorDescription, setSensorDescription] = useState();
    const [displayType, setType] = useState();

    const typeSensors = () => {
        if (displayType == "AC") {
            return (
                <>
                    <div className="form-group row">
                        <label for="staticTopicsRoomTemp" className="col-sm-2 col-form-label">
                            Room Temperature
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsRoomTemp" className="form-control" placeholder="Add Topics for Room Temperature" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="staticTopicsRoomHumid" className="col-sm-2 col-form-label">
                            Room Humidity
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsRoomHumid" className="form-control" placeholder="Add Topics for Room Humidity" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="staticTopicsACPower" className="col-sm-2 col-form-label">
                            AC Power
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsACPower" className="form-control" placeholder="Add Topics for AC Power" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="staticTopicsACTemperature" className="col-sm-2 col-form-label">
                            AC Temperature
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsACTemperature" className="form-control" placeholder="Add Topics for AC Temperature" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="staticTopicsACFan" className="col-sm-2 col-form-label">
                            AC Fan
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsACFan" className="form-control" placeholder="Add Topics for AC Fan" />
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="form-group row">
                        <label for="staticTopicsRoomBrightness" className="col-sm-2 col-form-label">
                            Room Brightness
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsRoomBrightness" className="form-control" placeholder="Add Topics for Room Brightness" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="staticTopicsRoomMotion" className="col-sm-2 col-form-label">
                            Room Motion
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsRoomMotion" className="form-control" placeholder="Add Topics for Room Motion" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="staticTopicsLampPower" className="col-sm-2 col-form-label">
                            Lamp Power
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id="inputTopicsLampPower" className="form-control" placeholder="Add Topics for Lamp Power" />
                        </div>
                    </div>

                </>
            )
        }

    }

    return (
        <>
            <Navbar />
            <div className="container-sm pt-5">
                <Link to="/sensors">
                    <button type="button" className="btn btn-outline-danger btn-md">Cancel</button>
                </Link>

                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-style flex-row my-5 bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">New Sensors</h5>

                                <form>
                                    <div className="form-group row">
                                        <label for="staticName" className="col-sm-2 col-form-label">
                                            Name
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" id="inputTitle" className="form-control" placeholder="ex: AC 1" value={sensorName} onChange={(e) => setSensorName(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label for="staticType" className="col-sm-2 col-form-label">
                                            Type
                                        </label>
                                        <div className="col-sm-10">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" value="AC" name="inputGroupType" id="inputRadioAC" onChange={(e) => setType(e.target.value)}></input>
                                                <label className="form-check-label" for="inputRadioAC">AC</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" value="Lamp" name="inputGroupType" id="inputRadioLamp" onChange={(e) => setType(e.target.value)}></input>
                                                <label className="form-check-label" for="inputRadioLamp">Lamp</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label for="staticDescription" className="col-sm-2 col-form-label">
                                            Description
                                        </label>
                                        <div className='col-sm-10'>
                                            <input type="text" id="inputDesc" className="form-control" placeholder="Add Description" value={sensorDescription} onChange={(e) => setSensorDescription(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <h5 className="col-sm-2 col-form-label text-center">
                                            Topics
                                        </h5>
                                    </div>



                                    {typeSensors()}
                                </form>

                                <div className="d-flex justify-content-center">
                                    <div className="d-flex flex-column">
                                        <div className="text-warning"><small></small></div>
                                        <button className="btn btn-primary m-3">Add Item</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddSensors; 