import React, { Component } from 'react';

// import the react-json-view component
import ReactJson from 'react-json-view';

// Json table view library
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter,dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import globals from '../globals.js' // << globals.js path

// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
class PeerViewStage2 extends React.Component {

  constructor() {
    super();

    this.state = {
      data: []
    }

    // only push changes to api
    this.modifiedData = []
    
  };

  columns = [
    {
      filter: textFilter(),
      dataField: 'HOSPITAL',
      text: 'HOSPITAL',
      sort: true,
      headerStyle: () => {
        return { minWidth: '300px' };}
      },
    {
    filter: textFilter(),
    dataField: 'DATE',
    text: 'DATE',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };},
    formatter: (cell) => {
      let dateObj = cell;
      if (typeof cell !== 'object') {
        dateObj = new Date(cell);
      }
      return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
    },
    editor: {
      type: Type.DATE
    }
    }, {
    filter: textFilter(),
    dataField: 'Personnel_D',
    text: 'Day',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };}
    },{
    filter: textFilter(),
    dataField: 'Personnel_A',
    text: 'Afternoon',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };} 
    },{
    filter: textFilter(),
    dataField: 'Personnel_N',
    text: 'Night',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };}
    }];

  // cellEdit = cellEditFactory({
  //   mode: 'click'
  //   ,afterSaveCell: (oldValue, newValue, row, column) => {
  //     this.setState({ dummyStatus: ++this.state.dummyStatus });
  //     console.log(this.state.products);   // the state is actually change here!
  //   }
  // });


  componentDidMount() {
    this.getItems()
    this.forceUpdate(); // update based on state
  };

  getItems() {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*' }
    };


    // access elastic EC2 instance public IP
    // fetch("http://checkip.amazonaws.com/", requestOptions)
    // .then(function(response) {
    //   console.log(response.text())
    //   return response.text()
    // })
    // .then(function(IP) {

    //   // check dev flag
    //   if (globals.development_mode){
    //     IP = "localhost"
    //   }


      // check globals for info
    async function get_ip(){
      if (globals.development_mode){
        return "localhost"
      }
      else{
        return globals.ec2_p_ip
      }
    }

    // connect to ec2 instance / localhost
    get_ip().then((IP) => {
      fetch("http://"+ IP +":8080/posts/stage2raw/", requestOptions)
        .then(res => res.json())
        .then(json => {
            this.setState({
              data: json.data,             
            })
            console.log(this.state.data)
            this.forceUpdate(); // update based on state
      });        
    })
    .catch(function(error) { 
      console.log('Requestfailed', error)
    });
  }
  
  formSubmit() {  // removes (evt) -> we're not using forms
    // console.log(this.state.data)   // log to
    //console.log(JSON.stringify(this.state.data)) // show JSON changes live
    // evt.preventDefault();   //prevent default submit behavior.

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*' 
      },
      body: JSON.stringify(this.state.data) //JSON.stringify(state) // this.state.modifiedData
    };

    // access elastic EC2 instance public IP
    // fetch("http://checkip.amazonaws.com/", requestOptions)
    // .then(function(response) {
    //   console.log(response.text())
    //   return response.text()
    // })
    // .then(function(IP) {

    //   // check dev flag
    //   if (globals.development_mode){
    //     IP = "localhost"
    //   }

      // check globals for info
    async function get_ip(){
      if (globals.development_mode){
        return "localhost"
      }
      else{
        return globals.ec2_p_ip
      }
    }

    // connect to ec2 instance / localhost
    get_ip().then((IP) => {
      fetch('http://localhost:8080/posts/modifyStage2/', requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.success){
          alert(   
            'Success: '+response.success +'\n\n'
          +'Message:\n'+ response.message);
        }
        else{
          alert(   
            'Success: '+response.success +'\n\n'
          +'Error:\n'+ response.error + '\n\n'
          +'Message:\n'+ response.message);
        }
      })
              
    })
    .catch(function(error) { 
      console.log('Requestfailed', error)
    });
  }

  render() {
    return (   
      <div>

        {/* show current DB contents */}
        <div>

          <BootstrapTable
            keyField="_id" // this might have to be reworked in regards to patient information security (depends on company policies and standards)
            data={ this.state.data }
            columns={ this.columns }
            filter={ filterFactory() }
            pagination={paginationFactory()}
            striped
            bordered={false}
            wrapperClasses="table-responsive"
            filterPosition="top"
            cellEdit={ cellEditFactory({
              mode: 'click',
              blurToSave: true,
              afterSaveCell: (oldValue, newValue, row, column) => {
                // console.log(this.state.data);  // still shows the initial data - [{id: 1, name: 'A'}]
                if (column.dataField == "DATE"){
                   row.DATE += "T00:00:00.000Z"
                }
                this.setState({data: this.state.data}); // trigger state change to show changes to user

                //this.modifiedData.push() // only push changes to our api
  
              }
            })}
          />
        </div>

        {/* submit button */}
        <div>
          <span>
            <button onClick={this.formSubmit.bind(this)} >Submit Changes</button>
          </span>
        </div>
          
        {/* show current json state */}
        {/* <div>
          <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </div> */}
      </div>
    )
};
}


export default PeerViewStage2;