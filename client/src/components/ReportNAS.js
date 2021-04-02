import React, { useState, useEffect } from 'react';
//Component, useState, , useEffect
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
//import {Bar, Line, Pie} from 'react-chartjs'
import { Line } from 'react-chartjs-2';
// import Chart from "chart.js";




// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function ReportNAS(props) {
    
    const [state, setState] = useState({ 
        data: [],
        DATE1:  "2021-03-23",
        DATE2: "2021-04-23"     //new Date().toLocaleDateString('en-CA') //new Date() --> curent date --> useEffect on load to render first time
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
                position: 'top',
                labels: {
                    fontColor: 'rgb(255, 99, 132)',
                    fontSize: 16,
                }
            },
            scales: {
                xAxes: [
                    {
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
        let apiNAS = [];
 
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
        };

        fetch("http://localhost:8080/data/ReportPatientPersonnelAvgPerShift/"+state.DATE1+"T00:00:00.000+00:00/"+state.DATE2+"T00:00:00.000+00:00", requestOptions)
            .then(res => res.json())
            .then(json => {

                // patients
                for (const dataObj of json.data[0]) {
                    //apiDate.push( (new Date(dataObj.DATE)).toISOString().split('T')[0].slice(4,7))
                    apiDate.push( (new Date(dataObj.DATE)).toISOString().split('T')[0].slice(8,))
                    apiPatient.push(parseFloat(dataObj.Pa_NAS))
                }

                // personnel
                for (const dataObj of json.data[1]) {
                    // apiDate.push(dataObj.DATE)
                    apiPersonnel.push(parseFloat(dataObj.Pe_NAS))
                }

                // calc nas
                for (let i = 0; i<apiPatient.length; i++) {
                    apiNAS.push( (apiPatient[i]/apiPersonnel[i])*100 )
                }


                console.log(apiPersonnel)
                console.log(apiPatient)

                // sort distinct date values in array
                // apiDate.filter((date, i, self) => self.findIndex(d => d.getTime() === date.getTime()) === i)


                setChartData({
                    labels: apiDate,
                    datasets: 
                    [{
                        barPercentage: 0.8,
                        label: "NAS per day",
                        backgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-fill')
                        ],
                        borderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-line')
                        ],
                        hoverBackgroundColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-hoverfill')
                        ],
                        hoverBorderColor: [
                            getComputedStyle(document.documentElement).getPropertyValue('--graph-red-hoverline')
                        ],
                        data: apiNAS
                    }]
                })
    
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

    
    // function formSubmit(evt = null) {
    //     if (evt != null) evt.preventDefault();   //prevent default submit behavior.
    //     let apiNAS = [];
    //     let apiID = [];
 
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
    //     };

    //     fetch("http://localhost:8080/data/nas/"+state.DATE1+"T00:00:00.000+00:00/"+state.DATE2+"T00:00:00.000+00:00", requestOptions)
    //         .then(res => res.json())
    //         .then(json => {
    //             setState({
    //                 ...state,
    //                 data: json.data
    //               });
    //             for (const dataObj of json.data) {
    //                 apiID.push(dataObj.RANGE)
    //                 apiNAS.push(parseInt(dataObj.NAS_WEIGHT))
    //             }

    //             setChartData({
    //                 labels: apiID,
    //                 datasets: [{
    //                     barPercentage: 0.8,
    //                     label: "Patient NAS Weight / Time",
    //                     backgroundColor: [
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-fill'),
    //                         getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-fill'),
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-green-fill')
    //                     ],
    //                     borderColor: [
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-line'),
    //                         getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-line'),
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-green-line')
    //                     ],
    //                     hoverBackgroundColor: [
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-hoverfill'),
    //                         getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-hoverfill'),
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-green-hoverfill')
    //                     ],
    //                     hoverBorderColor: [
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-blue-hoverline'),
    //                         getComputedStyle(document.documentElement).getPropertyValue(props.graph+'-hoverline'),
    //                         getComputedStyle(document.documentElement).getPropertyValue('--graph-green-hoverline')
    //                     ],
    //                     data: apiNAS,
    //                 }]
    //             })
                
    //             // use context in chartjs to color bars differently

    //             // setChartOptions({
    //             //     // responsive true
    //             //     maintainAspectRatio : false,
    //             //     responsive: true,
    //             //     scales: {
    //             //         yAxes: [{
    //             //             ticks: {
    //             //                 beginAtZero: true
    //             //             }
    //             //         }]
    //             //     }
    //             // })


    //             console.log(json.data)              
    //             //console.log(state.data)
    //         }
    //     );

    //     // build chartjs
    //     // var ctx = document.getElementById('myChart').getContext('2d');
    //     // new Chart(ctx, {
    //     //     type: "bar",
    //     //     ...chartData,
    //     //     ...chartOptions            
    //     // });
    // }

    // initialize dashboard, call once
    useEffect(() => {
        formSubmit()
    }, []);
    

     //console.log([...state.data])
    return (
        <div className="dashboard-item">


            {/* <div className="dashboard-item-top">
                 <a>Patient NAS Weight / Time <br></br></a>
                <a>How heavy was the patients in the time peroid?</a>
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

export default ReportNAS