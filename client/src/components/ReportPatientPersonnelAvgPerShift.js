import React, { useState, useEffect } from 'react';
//Component, useState, , useEffect
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
//import {Bar, Line, Pie} from 'react-chartjs'
import { Line } from 'react-chartjs-2';
// import Chart from "chart.js";




// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function ReportPatientPersonnelAvgPerShift(props) {
    
    const [state, setState] = useState({ 
        data: [],
        DATE1:  "2021-03-01",
        DATE2: "2021-04-01"     //new Date().toLocaleDateString('en-CA') //new Date() --> curent date --> useEffect on load to render first time
    });
    const [chartData,setChartData] = useState(
        {
            datasets: [{
                barPercentage: 0.8,
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
                position: 'top',
                labels: {
                    fontColor: 'rgb(255, 99, 132)',
                    fontSize: 16,
                }
            },
            scales: {
                xAxes: [
                    {
                    display: true,
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
                        display: true,
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
        let apiPersonnel = [];
        let apiPatient = [];
        let apiDate = [];
 
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
        };

        // EC" or localhost?
    var development_mode = true

    // access elastic EC2 instance public IP
    fetch("http://checkip.amazonaws.com/", requestOptions)
    .then(function(response) {
      console.log(response.text())
      return response.text()
    })
    .then(function(IP) {

      // check dev flag
      if (development_mode){
        IP = "localhost"
      }

        fetch("http://"+IP+":8080/data/ReportPatientPersonnelAvgPerShift/"+state.DATE1+"T00:00:00.000+00:00/"+state.DATE2+"T00:00:00.000+00:00", requestOptions)
            .then(res => res.json())
            .then(json => {

                // patients
                for (const dataObj of json.data[0]) {
                    apiDate.push( (new Date(dataObj.DATE)).toISOString().split('T')[0].slice(8,))
                    apiPatient.push(parseFloat(dataObj.Pa_NAS))
                }

                // personnel
                for (const dataObj of json.data[1]) {
                    // apiDate.push(dataObj.DATE)
                    apiPersonnel.push(parseFloat(dataObj.Pe_NAS))
                }
                // console.log(apiPersonnel)
                // console.log(apiPatient)
                // console.log(apiDate)

                // sort distinct date values in array
                // apiDate.filter((date, i, self) => self.findIndex(d => d.getTime() === date.getTime()) === i)


                setChartData({
                    labels: apiDate,
                    datasets: [{
                        barPercentage: 0.8,
                        label: "Personnel avg nas% / shift",
                        backgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-fill')
                        ],
                        borderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-line')
                        ],
                        hoverBackgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-hoverfill')
                        ],
                        hoverBorderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-hoverline')
                        ],
                        data: apiPersonnel
                    },
                    {
                        barPercentage: 0.8,
                        label: "Patient avg nas% / shift",
                        backgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-fill')
                        ],
                        borderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-line')
                        ],
                        hoverBackgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-hoverfill')
                        ],
                        hoverBorderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-orange-hoverline')
                        ],
                        data: apiPatient
                    }
                
                
                ]
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
                 <a>Personnel & Patient avg nas% / shift <br></br></a>
                <a>Do we have enough manpower to cover the weight?</a>
            </div> */}

            <div className="dashboard-item-graph">
                {/* <canvas id="myChart"/> */}
                <Line data={chartData} options={chartOptions}/>
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

export default ReportPatientPersonnelAvgPerShift