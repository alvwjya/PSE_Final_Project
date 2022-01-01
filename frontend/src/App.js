import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ItemsGalery from './components/ItemsGalery';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import AddRoom from './components/AddRoom';
import SensorsGalery from './components/SensorsGalery';
import AddSensors from './components/AddSensors';
import Notifications from './components/Notifications';
function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ItemsGalery}>
      </Route>
      <Route path="/Notifications" exact component={Notifications}>
      </Route>
      <Route path="/addRoom" exact component={AddRoom}>
      </Route>
      <Route path="/addSensors" exact component={AddSensors}>
      </Route>
      <Route path="/sensors" exact component={SensorsGalery}>
      </Route>
    </BrowserRouter>
   
  );
}

export default App;
