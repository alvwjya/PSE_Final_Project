import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';


const Notifications = () => {
    return (
        <>
        <Navbar/>
        <div className="container-lg-10">
            <div className="row">
                <div className="col-lg-11 col-xl-11 col-sm-11 col-xs-11 mx-auto">
                    <div className='card card-style flex-row bg-light mt-4'>
                        <div className='card-body'>
                            <h3 className="card-title">
                            Alert 1
                            </h3>
                            <p className="card-text">
                                Description Alert
                            </p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
        </>
    )
}

export default Notifications