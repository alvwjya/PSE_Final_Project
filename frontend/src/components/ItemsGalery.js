import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import rooms from './data/rooms.json';




const ItemsGalery = () => {

    return (

        <>
            <Navbar />

            <div className="container-fluid">
                <div className="title-header">
                    <h2 className="text-start header ms-3 p-2">Rooms:</h2>
                </div>
                <div className="row">
                    {rooms.map((room, index) => {
                        return (
                            <div className='col-sm'>
                                <div className="card me-2 ms-2 p-2 ">
                                    <div className="card-body">
                                        <h5 className="card-title">{room.roomName}</h5>
                                        <p className="card-text">{room.roomDesc}</p>
                                        <Link to="/sensors">
                                            <button className="btn btn-primary">
                                                Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>


                <div className="container-button">
                    <div className="text-center m-5 p-2">
                        <Link to="/addRoom">
                            <button className="btn btn-primary center" role="button">
                                Add Room
                            </button>
                        </Link>
                    </div>
                </div>


            </div>
        </>
    )
}

export default ItemsGalery;
