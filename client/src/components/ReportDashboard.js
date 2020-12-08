import React, { Component } from 'react';

import Reactable from "reactable";


var Table = Reactable.Table;
// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
class ReportDashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
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
              data: [json]
            })
        });
    
    // .then(findresponse => {
    //   this.setState({
    //     data: [findresponse]
    //   });
    //   console.log(this.state.data)
    // })
  };

  render() {
    return (
asd
      
      // <div>
      //   {
      //     this.state.data.map((dynamicData, Key) => {
      //       let keys = Object.keys(dynamicData);
      //       let d = dynamicData;
      //       return keys.map(data => {
      //         return (
      //           <div style={{borderBottom: '1px solid black'}}>
                  
      //             <table border={1} cellPadding={5}>
      //             <thead key="thead">
      //             {data.columns}
      //             </thead>

      //             <tbody>
      //               <tr>
      //                 <th>Currency: {data}</th>
      //                 <th>Buy: {dynamicData[data].TIME_IN}</th>
      //               </tr>
      //             </tbody>
      //             </table>
                  
      //           </div>
      //         );
      //       });
      //     })
          
      //   }
      // </div>
    )
  }
};
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