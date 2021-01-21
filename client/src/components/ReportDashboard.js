import React, { useState } from "react";

import ReportJSON from "./ReportJSON"
import ReportPatientNas from "./ReportPatientNas"

class ReportDashboard extends React.Component {


  render() {
  return (

  <div className="report-MainContainer">
    <div className="report-Container2">
        <ReportJSON />
        <ReportPatientNas />
    </div>


    <div className="report-Container2">
      <div className="report-item"> asdasdhey </div>
      <div className="report-item"> heasdasdy </div>
    </div>
  </div>

  )
};
}
export default ReportDashboard;
