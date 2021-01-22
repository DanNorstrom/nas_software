import React, { Component } from 'react';


// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
class ReportPatientNas extends React.Component {
    
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
    
        fetch("http://localhost:8080/data/patient_nas/:DATE", requestOptions)
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
                <a>asd</a>
            </div>
    )};
}
export default ReportPatientNas