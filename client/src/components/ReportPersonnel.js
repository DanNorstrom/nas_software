import React, { useState, useEffect } from 'react';
//Component, useState, , useEffect
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
//import {Bar, Line, Pie} from 'react-chartjs'
import { Bar, Doughnut } from 'react-chartjs-2';
// import Chart from "chart.js";

var globals = require('../globals'); // << globals.js path


// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function ReportPersonnel(props) {
    
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

    // sets initial graphics for graphs before they are populated
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
                position: 'top',
                labels: {
                    fontColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-line'),
                    fontSize: 16,
                }
            },
            scales: {
                xAxes: [{
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
        let apiData = [];
        let apiID = [];
 
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
        };


    // access elastic EC2 instance public IP
    fetch("http://checkip.amazonaws.com/", requestOptions)
    .then(function(response) {
      console.log(response.text())
      return response.text()
    })
    .then(function(IP) {

      // check dev flag
      if (globals.development_mode){
        IP = "localhost"
      }

        fetch("http://"+IP+":8080/data/personnel_count/"+state.DATE+"T00:00:00.000+00:00", requestOptions)
            .then(res => res.json())
            .then(json => {
                setState({
                    ...state,
                    data: json.data
                  });
                for (const dataObj of json.data) {
                    apiData.push(parseInt(dataObj.Personnel_D))
                    apiData.push(parseInt(dataObj.Personnel_A))
                    apiData.push(parseInt(dataObj.Personnel_N))
                }
                console.log(apiData)

                setChartData({
                    labels: ["Personnel Day","Personnel Afternoon","Personnel night"],
                    datasets: [{
                        barPercentage: 0.8,
                        label: "ICU Personnel / Day",
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-fill'),
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-line'),
                        hoverBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-hoverfill'),
                        hoverBorderColor: getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-hoverline'),
                        borderWidth: '2',
                        data: apiData,
                    }]
                })
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
                <a>How many nurses worked at the ICU today?</a>
            </div> */}

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

export default ReportPersonnel