import React, { useState } from "react";

import ReportJSON from "./ReportJSON"

// custom dashboard components
import ReportPatientNas from "./ReportPatientNas"
import ReportPatientWeights from "./ReportPatientWeights"

import { Grid, Row, Col } from 'react-flexbox-grid';


class ReportDashboard extends React.Component {


  render() {
  return (

  <div className="dashboard-main">
    <Grid fluid>
        <Row>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
          <Col xs><ReportPatientWeights graph={'--graph-red'}/></Col>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
        </Row>

        <Row>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
        </Row>

        <Row>
          <Col xs> <ReportPatientNas graph={'--graph-red'}/> </Col>
          {/* {/* <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col> */}
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
          <Col xs><ReportPatientNas graph={'--graph-red'}/></Col>
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
