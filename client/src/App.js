import React from "react";

import './App.css';

import Navbar from "./components/navigationBar";
import NAS_STAGE_1 from "./components/NAS_Stage_1"
import NAS_STAGE_2 from "./components/NAS_Stage_2"
import CheckData from "./components/CheckData"
import ReportDashboard from "./components/ReportDashboard"


import { BrowserRouter,Switch,Route } from "react-router-dom";


//bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // <div className="App">
    //   <NavBar />
    //   <NAS_STAGE_1 />
    // </div>


<BrowserRouter>
<div className="App">
<Navbar />
  <Switch>
    <Route exact path="/">
      <NAS_STAGE_1 />
    </Route>

    <Route path="/NasStage2">
    <NAS_STAGE_2 />
    </Route>

    <Route path="/CheckData">
    <CheckData />
    </Route>

    <Route path="/ReportDashboard">
    <ReportDashboard />
    </Route>

  </Switch>
</div>
</BrowserRouter>
  );
}

export default App;
