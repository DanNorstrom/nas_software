import React from "react";

import logo from './logo.svg';
import './App.css';

import NavBar from "./components/navigationBar";
import NAS_STAGE_1 from "./components/NAS_Stage_1"




//bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <NAS_STAGE_1 />
    </div>
  );
}

export default App;
