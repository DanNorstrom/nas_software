import React from "react";

import logo from './logo.svg';
import './App.css';

import navigationBar from "./components/navigationBar";
import DangerButton from "./components/DangerButton";
import NAS_STAGE_1 from "./components/NAS_Stage_1"

function App() {
  return (
    <div className="App">
      <DangerButton />
      <NAS_STAGE_1 />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. 

          testing update 1
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;
