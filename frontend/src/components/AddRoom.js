import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';


const AddRoom = () => {
    return (
        <>
        <Navbar/>
        <div className="container-sm pt-5">
            <Link to="/">
                <button type="button" className="btn btn-outline-danger btn-md">Cancel</button>
            </Link>

            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-style flex-row my-5 bg-light">
                        <div className="card-body">
                            <h5 className="card-title text-center">New Room</h5>

                            <form>
                            <div className="form-group row">
                                <label for="staticName" className="col-sm-2 col-form-label">
                                    Name
                                </label>
                                <div className="col-sm-10">
                                <input type="text" id="inputTitle" className="form-control" placeholder="ex: Room 1" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label for="staticDescription" className="col-sm-2 col-form-label">
                                    Description
                                </label>
                                <div className='col-sm-10'>
                                    <input type="text" id="inputDesc" className="form-control" placeholder="Add Description" />
                                </div>
                            </div>
                            </form>

                            <div className="d-flex justify-content-center">
                                <div className="d-flex flex-column">
                                    <div className="text-warning"><small></small></div>
                                    <button className="btn btn-primary m-3">Add Room</button>
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

export default AddRoom; 
