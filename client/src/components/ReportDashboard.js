import React, { useState } from "react";

import ReportJSON from "./ReportJSON"
import ReportPatientNas from "./ReportPatientNas"

import { Grid, Row, Col } from 'react-flexbox-grid';


class ReportDashboard extends React.Component {


  render() {
  return (

  <div className="dashboard-main">
    <Grid fluid>
        <Row>
          <Col lg={4}><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
        </Row>

        <Row>
          <Col xs><ReportPatientNas /></Col>
        </Row>

        <Row>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
          <Col xs><ReportPatientNas /></Col>
        </Row>
      </Grid>

    {/* <div className="report-Container2"> */}

    {/* </div> */}


    {/* <div className="report-Container2"> */}
      {/* <div className="dashboard-item"> asdasdhey </div>
      <div className="dashboard-item"> heasdasdy </div> */}
    {/* </div> */}

  </div>

  )
};
}
export default ReportDashboard;
