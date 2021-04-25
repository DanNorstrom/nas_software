import React from "react";

import './App.css';

import Navbar from "./components/navigationBar";
import NAS_STAGE_1 from "./components/NAS_Stage_1"
import NAS_STAGE_2 from "./components/NAS_Stage_2"
import PeerView from "./components/PeerView"
import ReportDashboard from "./components/ReportDashboard"
import LoginPage from "./components/LoginPage"


import { BrowserRouter,Switch,Route } from "react-router-dom";

//login + authenthication
import { useAuth0 } from "@auth0/auth0-react";
//import { Footer, Loading } from "./components";
//import { Home, Profile, ExternalApi } from "./views";
import Profile from "./view/profile"

// live demo from / at http://139.196.82.33:8080/iframe.html?id=demo--demo
import { SolarSystemLoading as Loading } from 'react-loadingg';
import Footer from "./components/Footer"

//bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  // fix screen flashing, replace with loading 
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }
  
  return (

    // decides what to render depending on path
    <div>
    <BrowserRouter>
    <div className="App">

    {/* top navigation bar*/}
    <Navbar />

    {/* Mainbody */}
    <Switch>


      <Route exact path="/">
      <LoginPage />
      </Route>

      <Route exact path="/NasStage1">
      <NAS_STAGE_1 />
      </Route>

      <Route path="/NasStage2">
      <NAS_STAGE_2 />
      </Route>

      <Route path="/PeerView">
      <PeerView/>
      </Route>
      
      <Route path="/ReportDashboard">
      <ReportDashboard/>
      </Route>

      <Route path="/Profile">
      <Profile/>
      </Route>

    </Switch>

    </div>
    </BrowserRouter>

    <Footer/>
    </div>

  );
}

export default App;
