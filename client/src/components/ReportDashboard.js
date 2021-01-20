import React, { useState } from "react";

import ReportJSON from "./ReportJSON"

class ReportDashboard extends React.Component {


  render() {
  return (

  <div className="report-MainContainer">
    <div className="report-Container">
        <ReportJSON />
        <ReportJSON />
    </div>


    <div className="report-Container">
      <div className="report-item"> asdasdhey </div>
      <div className="report-item"> heasdasdy </div>
    </div>
  </div>

  )
};
}
export default ReportDashboard;
