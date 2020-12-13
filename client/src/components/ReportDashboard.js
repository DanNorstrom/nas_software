import React, { Component } from 'react';

import Reactable from "reactable";
var Table = Reactable.Table;

// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
class ReportDashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      nestedData: []
    }
  };

  componentDidMount() {
    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
    };

    fetch("http://localhost:8080/posts/stage1raw/", requestOptions)
    .then(res => res.json())
        .then(json => {
            this.setState({
              data: [json],
              
            })

            console.log(this.state.data[0].data)
            // extract array from JSon
            this.setState({
              nestedData: this.state.data[0].data
            })
        });
    
    this.forceUpdate(); // update based on state

  };

  render() {
    return (

      <a>   </a>
     
            // <div>
            //     {
            //       Object.keys(this.state.nestedData).map((e, i) => {
            //         <SomeComponent key={i} {...e} />
            //       })
            //     }
            // </div>




          // this.state.nestedData.map((dynamicData, Key) => {
          //   let keys = Object.keys(dynamicData);
          //   let d = dynamicData;
          //   return keys.map(data => {
          //     return (
          //       <div style={{borderBottom: '1px solid black'}}>
                  
          //         <table border={1} cellPadding={5}>
          //         <thead key="thead">
          //         {data.columns}
          //         </thead>

                  // <tbody>
                  //   <tr>
                  //     <th>Currency: {data}</th>
                  //     <th>Buy: {dynamicData[data].PATIENT_ID}</th>
                  //   </tr>
                  // </tbody>
          //         </table>
                  
          //       </div>
          //     );
          //   });
          // })
          
      //   }
      // </div>
    )
};
}
    // return (
    //     <div className="app" >
    //       <form>
    //       <div class="grid-MainReportDashboard">
    //         <table border={2} cellPadding={5}>

    //         </table>
    //       </div>
    //       </form>
    //     </div>
    // )


export default ReportDashboard;