import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse_target" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                        </span>
                    </button>
                    <a className="navbar-brand" href="/">
                        <span className="project-title">
                            PSE Project
                        </span>
                    </a>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle end-0" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="bi bi-list icon-dropdown">
                            </span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to="/Notifications">
                            <button className="dropdown-item navbar-button-text">Notifications</button> 
                        </Link>
                        </div>
                    </li>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;