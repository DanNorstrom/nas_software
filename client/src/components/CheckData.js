import React, { useState } from "react";

import ReportJSON from "./ReportJSON"
import ReportPatientNas from "./ReportPatientNas"

class CheckData extends React.Component {


  render() {
  return (

  <div className="report-MainContainer">

    <div className="report-Container1">
        <ReportJSON />
    </div>

    <div className="report-Container1">
      <ReportPatientNas />
    </div>

  </div>

  )
};
}
export default CheckData;
