import React, { Component } from 'react';

// import the react-json-view component
import ReactJson from 'react-json-view';

// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
class ReportJSON extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  };

  componentDidMount() {
    this.getItems()
    this.forceUpdate(); // update based on state
  };

  getItems() {
    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
    };

    fetch("http://localhost:8080/posts/stage1raw/", requestOptions)
      .then(res => res.json())
      .then(json => {
           this.setState({
             data: json.data,             
           })
           console.log(this.state.data)
    });        
  }
  

  

  render() {
    return (    
        <div className="report-item">
          {/* <ul> */}
          {/* {this.state.data.map(function(item, index) {
            // return <h1>{item.PATIENT_ID}</h1>
            // return <h1>{JSON.stringify(item)}</h1>
          })} */}
          <ReactJson src={this.state.data} theme="monokai" collapsed="false" iconStyle="circle" name="Patient JSON"/>
          {/* </ul> */}
        </div>
    )
};
}


export default ReportJSON;