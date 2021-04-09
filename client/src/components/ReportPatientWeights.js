import React, { useState, useEffect } from 'react';
//Component, useState, , useEffect
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
//import {Bar, Line, Pie} from 'react-chartjs'
import { Bar, Doughnut } from 'react-chartjs-2';
// import Chart from "chart.js";

import globals from '../globals.js' // << globals.js path


// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function ReportPatientWeights(props) {
    
    const [state, setState] = useState({ 
        data: [],
        DATE1:  "2021-03-01",
        DATE2: "2021-04-01"     //new Date().toLocaleDateString('en-CA') //new Date() --> curent date --> useEffect on load to render first time
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
            animation: {
                duration: 2000,
            },
            legend: {
                display: true,
                position: 'left',
                labels: {
                    fontColor: 'rgb(255, 99, 132)',
                    fontSize: 16,
                }
            },
            scales: {
                xAxes: [
                    {
                    display: false,
                    gridLines: {
                        display: false,
                        color: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-axiz'),
                        lineWidth:1,
                        zeroLineColor: "transparent"
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-axiz'),
                        lineWidth:1,
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        display: false,
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
        fetch("http://"+IP+":8080/data/patient_weights/"+state.DATE1+"T00:00:00.000+00:00/"+state.DATE2+"T00:00:00.000+00:00", requestOptions)
            .then(res => res.json())
            .then(json => {
                setState({
                    ...state,
                    data: json.data
                  });
                for (const dataObj of json.data) {
                    apiID.push(dataObj.RANGE)
                    apiNAS.push(parseInt(dataObj.NAS_WEIGHT))
                }

                setChartData({
                    labels: apiID,
                    datasets: [{
                        barPercentage: 0.8,
                        label: "Patient NAS Weight / Time",
                        backgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-fill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-green-fill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-yellow-fill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-fill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-fill')
                        ],
                        borderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-line'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-green-line'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-yellow-line'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-line'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-line')
                        ],
                        hoverBackgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-hoverfill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-green-hoverfill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-yellow-hoverfill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-hoverfill'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-hoverfill')
                        ],
                        hoverBorderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-hoverline'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-green-hoverline'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-yellow-hoverline'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-hoverline'),
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-hoverline')
                        ],
                        data: apiNAS,
                    }]
                })
                console.log(json.data)              
            });
        })
        .catch(function(error) { 
          console.log('Requestfailed', error)
        });
    }

    // initialize dashboard, call once
    useEffect(() => {
        formSubmit()
    }, []);
    
    return (
        <div className="dashboard-item">


            {/* <div className="dashboard-item-top">
                 <a>Patient NAS Weight / Time <br></br></a>
                <a>How heavy was the patients in the time peroid?</a>
            </div> */}
            <div className="dashboard-item-top">
            <a>Patient NAS Weight / Time <br></br></a>
            </div>

            <div className="dashboard-item-graph-top">
                {/* <canvas id="myChart"/> */}
                <Doughnut data={chartData} options={chartOptions}/>
            </div>

            <div className="dashboard-item-bottom">
                <form onSubmit={formSubmit}>
                    <input
                    type="date"
                    name="DATE1"
                    value={state.DATE1}
                    onChange={handleChange}
                    required
                    />
                    <input
                    type="date"
                    name="DATE2"
                    value={state.DATE2}
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

export default ReportPatientWeights