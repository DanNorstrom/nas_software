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

// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
class PeerViewStage1 extends React.Component {

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
    dataField: 'PATIENT_ID',
    text: 'ID',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };}
    },{
    filter: textFilter(),
    dataField: 'ROOM_NR',
    text: 'ROOM',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };} 
    },{
    filter: textFilter(),
    dataField: 'WORK_SHIFT',
    text: 'SHIFT',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };}
    },{
    filter: textFilter(),
    dataField: 'TIME_IN',
    text: 'TIME-IN',
    sort: true,
    // editor: {
    //   type: Type.
    // },
    headerStyle: () => {
      return { minWidth: '200px' };}
    },{
    filter: textFilter(),
    dataField: 'TIME_OUT',
    text: 'TIME-OUT',
    sort: true,
    headerStyle: () => {
      return { minWidth: '200px' };}
    },  {
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
    },  {
    dataField: 'BA1A',
    text: 'BA1A',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA1B',
    text: 'BA1B',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA1C',
    text: 'BA1C',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA2',
    text:  'BA2',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA3',
    text:  'BA3',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA4A',
    text: 'BA4A',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA4B',
    text: 'BA4B',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA4C',
    text: 'BA4C',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }    
    },  {
    dataField: 'BA5',
    text:  'BA5',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA6A',
    text: 'BA6A',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA6B',
    text: 'BA6B',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA6C',
    text: 'BA6C',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA7A',
    text: 'BA7A',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA7B',
    text: 'BA7B',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA8A',
    text: 'BA8A',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA8B',
    text: 'BA8B',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA8C',
    text: 'BA8C',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA9',
    text:  'BA9',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA10',
    text: 'BA10',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA11',
    text: 'BA11',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA12',
    text: 'BA12',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA13',
    text: 'BA13',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA14',
    text: 'BA14',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA15',
    text: 'BA15',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA16',
    text: 'BA16',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA17',
    text: 'BA17',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA18',
    text: 'BA18',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA19',
    text: 'BA19',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA20',
    text: 'BA20',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA21',
    text: 'BA21',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA22',
    text: 'BA22',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
    },  {
    dataField: 'BA23',
    text: 'BA23',
    sort: true,
    filter: textFilter(),
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    }
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
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
    };

    fetch("http://localhost:8080/posts/stage1raw/", requestOptions)
      .then(res => res.json())
      .then(json => {
           this.setState({
             data: json.data,             
           })
           console.log(this.state.data)
           this.forceUpdate(); // update based on state
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

    fetch('http://localhost:8080/posts/modifyStage1/', requestOptions)
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
                   this.setState({data: this.state.data}); // trigger state change to show changes to user
                }
                // if time_out is not hh:mm format, alert user and reset value
                else if (column.dataField == "TIME_IN"){
                  if (/[0-9]{2}:[0-9]{2}/.test(newValue) ) { // is match
                    this.setState({data: this.state.data})
                  }
                  else{
                    row.TIME_IN = oldValue
                    alert(newValue +' is not a number, please use the format hh:mm')
                  }
                }
                // if time_in is not hh:mm format, alert user and reset value
                else if (column.dataField == "TIME_OUT"){
                  if (/[0-9]{2}:[0-9]{2}/.test(newValue) ) { // is match
                    this.setState({data: this.state.data})
                  }
                  else{
                    row.TIME_OUT = oldValue
                    alert(newValue +' is not a number, please use the format hh:mm')
                  }
                }
                // (column.dataField == "DATE")
                else{
                  this.setState({data: this.state.data}); // trigger state change to show changes to user
                }
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


export default PeerViewStage1;