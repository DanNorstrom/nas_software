import React, { useState } from "react";

// custom dashboard components
import ReportPatientNas from "./ReportPatientNas"
import ReportPatientWeights from "./ReportPatientWeights"
import ReportNAS from "./ReportNAS"
import ReportPersonnel from "./ReportPersonnel"
import ReportPatientPersonnelAvgPerShift from "./ReportPatientPersonnelAvgPerShift"
import DashboardMenu from "./DashboardMenu"
import NorwayHeatMap from "./NorwayHeatMap"

import { Grid, Row, Col } from 'react-flexbox-grid';
import { SolarSystemLoading as Loading } from 'react-loadingg';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

class ReportDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Hospital: "Akershus universitetssykehus"}; // same as menu

    this.updateHospital = this.updateHospital.bind(this);
  }

  updateHospital(hospital) {
      this.setState({Hospital: hospital});
      // console.log('DB ' + hospital)
      // console.log('state ' + this.state.Hospital)
  }

  render() {
  return (

  <div className="dashboard-main">
    <Grid fluid>

        <Row>
          <Col xs> <DashboardMenu hospital={this.state.Hospital} updateHospital={this.updateHospital}/></Col>
        </Row>
      
        {/* phone, small, medium large viewports */}
        <Row>
          <Col xs><ReportNAS hospital={this.state.Hospital} graph={'--graph-red'}/></Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={4}><ReportPatientNas hospital={this.state.Hospital} graph={'--graph-red'}/></Col>
          <Col xs={12} sm={12} md={12} lg={4}><ReportPatientWeights hospital={this.state.Hospital} graph={'--graph-red'}/></Col>
          <Col xs={12} sm={12} md={12} lg={4}><ReportPersonnel hospital={this.state.Hospital} graph={'--graph-blue'}/></Col>
        </Row>

        <Row>
          <Col xs><ReportPatientPersonnelAvgPerShift hospital={this.state.Hospital} graph={'--graph-orange'}/></Col>
        </Row>

        {this.state.Hospital == "Global"?
        <Row>
          <Col xs> <NorwayHeatMap /> </Col> 
        </Row>
        :
        null
        }

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        


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
// export default ReportDashboard;
export default withAuthenticationRequired(ReportDashboard, {
  onRedirecting: () => <Loading />,
});