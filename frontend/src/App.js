import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ItemsGalery from './components/UnusedUI/ItemsGalery';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import AddRoom from './components/UnusedUI/AddRoom';
import SensorsGalery from './components/SensorsGalery';
import AddSensors from './components/UnusedUI/AddSensors';
import Notifications from './components/UnusedUI/Notifications';
function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SensorsGalery}/>
      <Route path="/Notifications" exact component={Notifications}>
      </Route>
      <Route path="/addRoom" exact component={AddRoom}>
      </Route>
      <Route path="/addSensors" exact component={AddSensors}>
      </Route>
      <Route path="/rooms" exact component={ItemsGalery}>
      </Route>
    </BrowserRouter>
   
  );
}

export default App;
