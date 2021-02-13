import React, { useState, useEffect } from 'react';
//Component, useState, , useEffect
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
//import {Bar, Line, Pie} from 'react-chartjs'
import { Bar, Doughnut } from 'react-chartjs-2';
// import Chart from "chart.js";




// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function ReportPatientNas(props) {
    
    const [state, setState] = useState({ 
        data: [],
        DATE:  "2021-03-23"//new Date().toLocaleDateString('en-CA') //new Date() --> curent date --> useEffect on load to render first time
    });
    const [chartData,setChartData] = useState(
        {
            datasets: [{
                barPercentage: 0.8,
                label: "Patient NAS / Day",
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--graph-0'),
                borderColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-line'),
                borderWidth: '2',
            }]
        }
    )
    const [chartOptions,setChartOptions] = useState(
        {
            // responsive true
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'rgb(255, 99, 132)',
                    fontSize: 16,
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        color: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-axiz'),
                        lineWidth:1,
                        zeroLineColor: "transparent"
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-axiz'),
                        lineWidth:1,
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    )

    function handleChange(evt) {
        setState({
          ...state,
          [evt.target.name]: evt.target.value
        });
    }
    
    function formSubmit(evt = null) {
        if (evt != null) evt.preventDefault();   //prevent default submit behavior.
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
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-fill'),
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-line'),
                        hoverBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-hoverfill'),
                        hoverBorderColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-hoverline'),
                        borderWidth: '2',
                        data: apiNAS,
                    }]
                })
                
                // use context in chartjs to color bars differently

                // setChartOptions({
                //     // responsive true
                //     maintainAspectRatio : false,
                //     responsive: true,
                //     scales: {
                //         yAxes: [{
                //             ticks: {
                //                 beginAtZero: true
                //             }
                //         }]
                //     }
                // })


                //console.log(json.data)              
                //console.log(state.data)
            }
        );

        // build chartjs
        // var ctx = document.getElementById('myChart').getContext('2d');
        // new Chart(ctx, {
        //     type: "bar",
        //     ...chartData,
        //     ...chartOptions            
        // });
    }

    // initialize dashboard, call once
    useEffect(() => {
        formSubmit()
    }, []);
    

     //console.log([...state.data])
    return (
        <div className="dashboard-item">


            <div className="dashboard-item-top">
                <a>What NAS numbers where reported today?</a>
            </div>

            <div className="dashboard-item-graph">
                {/* <canvas id="myChart"/> */}
                <Bar data={chartData} options={chartOptions}/>
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
                    <button className="button-sub" type="submit" >Get</button>
                </span>
                </form>
            </div>
        </div>
    )
};

export default ReportPatientNas