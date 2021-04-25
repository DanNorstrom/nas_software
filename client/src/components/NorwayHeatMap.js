import React, { useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import globals from '../globals.js' // << globals.js path

import norwayHigh from "@amcharts/amcharts4-geodata/norwayHigh";

am4core.useTheme(am4themes_animated);

// adapted from
// https://www.amcharts.com/docs/v4/chart-types/map/
// https://codepen.io/team/amcharts/pen/dyYRRLX

class NorwayHeatMap extends React.Component {

    constructor() {
        super();
    
        this.state = {
            data: [],
            DATE1:  "2021-03-01",
            DATE2:  "2021-03-05"
        }

        this.handleChangeD1 = this.handleChangeD1.bind(this)
        this.handleChangeD2 = this.handleChangeD2.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }


    handleChangeD1(evt){
        this.state.DATE1 = evt.target.value;
    }
    handleChangeD2(evt){
        this.state.DATE2 = evt.target.value;
        console.log(this.state.DATE2)
    }

    formSubmit(evt = null) {
        if (evt != null) evt.preventDefault();   //prevent default submit behavior.
 
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' }
        };

        var requestOptionsAWS = {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            }
          };
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
            fetch("http://"+IP+":8080/data/NasMapData/"+this.state.DATE1+"T00:00:00.000+00:00/"+this.state.DATE2+"T00:00:00.000+00:00", requestOptions)
            .then(res => res.json())
            .then(json => {

                // this.chart.data.
                console.log(json)


                // "Akershus universitetssykehus"
                // "Oslo universitetssykehus"
                // "Haukeland universitetssykehus"
                // "Stavanger universitetssjukehus"
                // "St. Olavs hospital"
                // "Sykehuset Østfold"
                // "Sykehuset i Vestfold"
                // "Sykehuset Telemark"
                // "Bærum sykehus"
                // "Drammen sykehus"
                // "Universitetssykehuset Nord-Norge"
                // "Haugesund sjukehus"
                // "Førde sentralsjukehus"
                // "Sykehuset Innlandet"
                // "Ålesund sjukehus"
                // "Sørlandet sykehus"
                // "Sykehuset Levanger"
                // "Ringerike sykehus"
                // "Nordlandssykehuset"
                // "Kristiansund sjukehus"
                // "Molde sjukehus"
                // "Nordlandssykehuset Vesterålen"
                // "Stord sjukehus"
                // "Volda sjukehus"
                // "Sykehuset Namsos"
                // "Finnmarkssykehuset"
                // "Helgelandssykehuset"
                // "Kongsberg sykehus"
                // "Flekkefjord sykehus"
                // "Harstad sykehus"
                // "Narvik sykehus"
                // "Voss sjukehus"


                // we expect JSON to be ordered, might lead to liability issues, 100% passed the test for now
                this.state.data = [     
                    // this.chart.data = [
                    { id: "NO-01", title: "Østfold", value: json.data[25]["NAS"] },
                    { id: "NO-02", title: "Akershus", value: json.data[0]["NAS"] },
                    { id: "NO-03", title: "Oslo", value: (json.data[16]["NAS"]+json.data[1]["NAS"]+json.data[2]["NAS"]) /3 },
                    { id: "NO-04", title: "Hedmark", value: json.data[22]["NAS"] },
                    // { id: "NO-05", title: "Oppland", value: 0 }, // no hospitals allocated yet
                    { id: "NO-06", title: "Buskerud", value: json.data[17]["NAS"] },
                    { id: "NO-07", title: "Vestfold", value: (json.data[20]["NAS"]+json.data[21]["NAS"]+json.data[29]["NAS"]) /3 },
                    { id: "NO-08", title: "Telemark", value: (json.data[10]["NAS"]+json.data[24]["NAS"])/2 },
                    { id: "NO-09", title: "Aust-Agder", value: json.data[26]["NAS"] },
                    { id: "NO-10", title: "Vest-Agder", value: json.data[4]["NAS"] },
                    { id: "NO-11", title: "Rogaland", value: (json.data[7]["NAS"]+json.data[19]["NAS"])/2 },
                    { id: "NO-12", title: "Hordaland", value: json.data[8]["NAS"] },

                    { id: "NO-23", title: "Trøndelag", value: json.data[18]["NAS"] },

                    { id: "NO-14", title: "Sogn og Fjordane", value: json.data[5]["NAS"] },
                    { id: "NO-15", title: "Møre og Romsdal", value: (json.data[11]["NAS"]+json.data[12]["NAS"]+json.data[28]["NAS"]+json.data[30]["NAS"])/4 },
                    { id: "NO-16", title: "Sør-Trøndelag", value: json.data[22]["NAS"] },
                    { id: "NO-17", title: "Nord-Trøndelag", value: json.data[23]["NAS"] },
                    { id: "NO-18", title: "Nordland", value: (json.data[9]["NAS"]+json.data[13]["NAS"]+json.data[14]["NAS"]+json.data[15]["NAS"])/4 },
                    { id: "NO-19", title: "Troms", value: (json.data[6]["NAS"]+json.data[27]["NAS"])/2 },
                    { id: "NO-20", title: "Finnmark", value:json.data[3]["NAS"] }
                ]
                // this.forceUpdate()
                // Set map definition
       this.chart.geodata = norwayHigh
        // chart.geodata = am4geodata_norwayHigh;
  
        // Create map polygon series
        var polygonSeries =this.chart.series.push(new am4maps.MapPolygonSeries());      
  
        //Set min/max fill color for each area
        polygonSeries.heatRules.push({
            property: "fill",
            target: polygonSeries.mapPolygons.template,
            min: am4core.color("#7ed7fc"), //this.chart.colors.getIndex(1).brighten(1),
            max: am4core.color("#ED7B84"), //this.chart.colors.getIndex(1).brighten(-0.3),
            logarithmic: true
        });

        // Make map load polygon data (state shapes and names) from GeoJSON
        polygonSeries.useGeodata = true;

        // Set heatmap values for each state
        polygonSeries.data = this.state.data

        // Set up heat legend
        let heatLegend = this.chart.createChild(am4maps.HeatLegend);

        heatLegend.minColor = am4core.color("#7ed7fc");
        heatLegend.maxColor = am4core.color("#ED7B84");
        heatLegend.minValue = 0;
        heatLegend.maxValue = 140;

        heatLegend.series = polygonSeries;
        heatLegend.align = "right";
        heatLegend.valign = "bottom";
        heatLegend.height = am4core.percent(40);
        heatLegend.orientation = "vertical";
        heatLegend.marginRight = am4core.percent(4);
        heatLegend.marginBottom = am4core.percent(4);
        heatLegend.valueAxis.renderer.opposite = true;
        heatLegend.valueAxis.renderer.dx = - 25;
        // heatLegend.valueAxis.strictMinMax = false;
        // heatLegend.valueAxis.fontSize = 9;
        // heatLegend.valueAxis.logarithmic = true;

        // Configure series tooltip
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: \n {value}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#ffffff");


        // heat legend behavior
        polygonSeries.mapPolygons.template.events.on("over", function (event) {
        handleHover(event.target);
        })

        polygonSeries.mapPolygons.template.events.on("hit", function (event) {
        handleHover(event.target);
        })

        function handleHover(column) {
        if (!isNaN(column.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
        }
        else {
            heatLegend.valueAxis.hideTooltip();
        }
        }

        polygonSeries.mapPolygons.template.events.on("out", function (event) {
        heatLegend.valueAxis.hideTooltip();
        })

        // disable drag, resize and zoom
        this.chart.seriesContainer.draggable = false;
        // chart.seriesContainer.resizable = false;
        this.chart.maxZoomLevel = 1;
                

            });
        })
        .catch(function(error) { 
          console.log('Requestfailed', error)
        });
    }


    componentDidMount() {

        // Create map instance
        let chart = am4core.create("chartdiv", am4maps.MapChart);


        this.chart = chart;



        // fetch
        this.formSubmit()
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }

    render() {
        return (
            <div class="dashboard-map">

                <div id="chartdiv" style={{ width: "100%", height: "57em",color: "#ffffff" }}></div>

                <div className="dashboard-item-bottom">
                <form onSubmit={this.formSubmit}>
                    <input
                    type="date"
                    name="DATE1"
                    value={this.state.DATE1}
                    onChange={this.handleChangeD1}
                    required
                    />
                    <input
                    type="date"
                    name="DATE2"
                    value={this.state.DATE2}
                    onChange={this.handleChangeD2}
                    required
                    />
                {/* submit button */}
                <span>
                    <button className="button-sub" type="submit" >Get</button>
                </span>
                </form>
            </div>

            </div>
        );
      }

}


export default NorwayHeatMap;
