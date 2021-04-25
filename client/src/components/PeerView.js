import React, { useState } from "react";
import { Grid, Row, Col } from 'react-flexbox-grid';

import PeerViewStage1 from "./PeerViewStage1"
import PeerViewStage2 from "./PeerViewStage2"

import { SolarSystemLoading as Loading } from 'react-loadingg';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

class PeerView extends React.Component {


  render() {
    return (

      <div className="peerview-main">
        <Grid fluid>
          
            {/* phone, smssall, medium large viewports */}
            <Row>
              <Col xs><PeerViewStage1/></Col>
            </Row>

            <Row>
              <Col xs><PeerViewStage2/></Col>
            </Row>
    
        </Grid>
    
      </div>
      
      

  )
};
}
// export default PeerView;
export default withAuthenticationRequired(PeerView, {
  onRedirecting: () => <Loading />,
});
