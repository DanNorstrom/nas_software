import React, { useState, useEffect } from 'react';
//Component, useState, , useEffect
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
//import {Bar, Line, Pie} from 'react-chartjs'
import { Bar, Doughnut } from 'react-chartjs-2';




// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function ReportPatientNas() {
    
    const [state, setState] = useState({ 
        data: [],
        DATE: null
    });
    const [chartData,setChartData] = useState({}) //empty object

    function handleChange(evt) {
        const value =
          evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    }
    
    function formSubmit(evt) {
        evt.preventDefault();   //prevent default submit behavior.
        let apiNAS = [];
        let apiID = [];
 
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
        };

        fetch("http://localhost:8080/data/patient_nas/"+state.DATE+"T00:00:00.000+00:00", requestOptions)
            .then(res => res.json())
            .then(json => {
                setState({
                    ...state,
                    data: json.data
                  });
                for (const dataObj of json.data) {
                    apiID.push(parseInt(dataObj.PATIENT_ID))
                    apiNAS.push(parseInt(dataObj.NAS))
                }
                setChartData({
                    labels: apiID,
                    datasets: [{
                        label: "Patient NAS / Day",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: apiNAS,
                    }]
                })
                //console.log(json.data)              
                //console.log(state.data)
            }
        );
    }

    // const Chart = () => {
    //     setChartData({
    //         labels: apiID,
    //         datasets: [{
    //             label: "My First dataset",
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgb(255, 99, 132)',
    //             data: apiNAS,
    //         }]
    //     })
    // }

    // useEffect(() => {
    //     Chart();
    // })

     //console.log([...state.data])
    return (
        <div className="report-item">

            {/* <div>
                <XYPlot height={300} width={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <VerticalBarSeries data={[...state.data]} />
                </XYPlot>
            </div> */}

            <div>
                <Bar data={chartData}/>
            </div>

            <form onSubmit={formSubmit}>
            <div class="grid-FormContainer1" > 
                <div class="form-TextInput">
                    <input
                    type="date"
                    name="DATE"
                    value={state.DATE}
                    onChange={handleChange}
                    required
                    />
                </div>
            </div>

            {/* submit button */}
            <div className="grid-FormContainer1">
                <span>
                    <button type="submit" >Get Date's NAS</button>
                </span>
            </div>
            </form>
        </div>
    )
};

export default ReportPatientNas