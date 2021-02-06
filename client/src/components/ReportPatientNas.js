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
        DATE:  "2021-02-01"//new Date().toLocaleDateString('en-CA') //new Date() --> curent date --> useEffect on load to render first time
    });
    const [chartData,setChartData] = useState({}) //empty object

    function handleChange(evt) {
        setState({
          ...state,
          [evt.target.name]: evt.target.value
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
                        barPercentage: 0.8,
                        label: "Patient NAS / Day",
                        backgroundColor: 'rgb(255, 99, 132, 0.0)',
                        borderColor: 'rgb(255, 99, 132, 1)',
                        borderWidth: '2',
                        data: apiNAS,
                    }],
                    options: {
                        // responsive true
                        maintainAspectRatio : false,
                        responsive: true
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                        
                    }
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


    // this works, fix after we have removed the form

    // useEffect(() => {
    //     formSubmit();
    //  }, []);
    

     //console.log([...state.data])
    return (
        <div className="dashboard-item">

            {/* <div>
                <XYPlot height={300} width={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <VerticalBarSeries data={[...state.data]} />
                </XYPlot>
            </div> */}
            <div className="dashboard-item-top">
                <a>description</a>
            </div>

            <div className="dashboard-item-graph">
                <Bar data={chartData} options={{ maintainAspectRatio: false, responsive: true }}/>
            </div>

            <div className="dashboard-item-bottom">
                <form onSubmit={formSubmit}>
                    <input
                    type="date"
                    name="DATE"
                    value={state.DATE}
                    onChange={handleChange}
                    required
                    />
                {/* submit button */}
                <span>
                    <button type="submit" >Get Date's NAS</button>
                </span>
                </form>
            </div>

        </div>
    )
};

export default ReportPatientNas