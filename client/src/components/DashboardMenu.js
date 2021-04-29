import React, { useState, useEffect } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';

// this becomes a JSX component?
const DashboardMenu = (props) => {

    // shared var with parent (Dashboard)
    function updateHospital(h) {
        props.updateHospital(h)
    }

    // Helper method-> get value from dropdown menu trough evt
    function handleChange(evt) {
        props.updateHospital(evt.target.value)
        //console.log(props.hospital)
    }


    // toggle collapse dashboard menu
    const [showMenu, setShowMenu] = React.useState(true)
    const toggleMenu = () => {
    if (showMenu) setShowMenu(false)
    else setShowMenu(true)
    }


    const Dropdown = () => {
        return( 
        <div >
        {/* <div class="btn-group d-flex" style={{width: '100%'}}> */}
        <Grid fluid>
    

            <Row>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Akershus universitetssykehus")
                }}
            >
                <h>Akershus universitetssykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Bærum sykehus")
                }}
            >
                <h>Bærum sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Drammen sykehus")
                }}
            >
                <h>Drammen sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Finnmarkssykehuset")
                }}
            >
                <h>Finnmarkssykehuset</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Flekkefjord sykehus")
                }}
            >
                <h>Flekkefjord sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Førde sentralsjukehus")
                }}
            >
                <h>Førde sentralsjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Harstad sykehus")
                }}
            >
                <h>Harstad sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Haugesund sjukehus")
                }}
            >
                <h>Haugesund sjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Haukeland universitetssykehus")
                }}
            >
                <h>Haukeland universitetssykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Helgelandssykehuset")
                }}
            >
                <h>Helgelandssykehuset</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Kongsberg sykehus")
                }}
            >
                <h>Kongsberg sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Kristiansund sjukehus")
                }}
            >
                <h>Kristiansund sjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Molde sjukehus")
                }}
            >
                <h>Molde sjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Narvik sykehus")
                }}
            >
                <h>Narvik sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Nordlandssykehuset Vesterålen")
                }}
            >
                <h>Nordlandssykehuset Vesterålen</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Nordlandssykehuset")
                }}
            >
                <h>Nordlandssykehuset</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Oslo universitetssykehus")
                }}
            >
                <h>Oslo universitetssykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Ringerike sykehus")
                }}
            >
                <h>Ringerike sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Sørlandet sykehus")
                }}
            >
                <h>Sørlandet sykehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("St. Olavs hospital")
                }}
            >
                <h>St. Olavs hospital</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Stavanger universitetssjukehus")
                }}
            >
                <h>Stavanger universitetssjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Stord sjukehus")
                }}
            >
                <h>Stord sjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Sykehuset i Vestfold")
                }}
            >
                <h>Sykehuset i Vestfold</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Sykehuset Innlandet")
                }}
            >
                <h>Sykehuset Innlandet</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Sykehuset Levanger")
                }}
            >
                <h>Sykehuset Levanger</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Sykehuset Namsos")
                }}
            >
                <h>Sykehuset Namsos</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Sykehuset Østfold")
                }}
            >
                <h>Sykehuset Østfold</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Sykehuset Telemark")
                }}
            >
                <h>Sykehuset Telemark</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Universitetssykehuset Nord-Norge")
                }}
            >
                <h>Universitetssykehuset Nord-Norge</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Volda sjukehus")
                }}
            >
                <h>Volda sjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Voss sjukehus")
                }}
            >
                <h>Voss sjukehus</h>
            </button>
            </Col>
                

            <Col xs={12} sm={5} md={4} lg={3}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block"
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Ålesund sjukehus")
                }}
            >
                <h>Ålesund sjukehus</h>
            </button>
            </Col>
            </Row>

            <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
            <button
                className="btn btn-xs btn-outline-secondary btn-block "
                style={{marginTop: '.5rem'}}
                data-toggle="buttonM"
                onClick= {() => {
                    updateHospital("Global")
                }}
                >
                    <h>Global</h>
            </button>
            </Col>
            </Row>

        </Grid>
        {/* </div> */}
        </div>    
        )
    }

    const SelectMenu = (props) => {

        // useEffect(() => {
            
        // }, [props.hospital]); //re-render component when props update
        
        
        return(
        <div class="grid-FormContainer1-full-dashboard" > 
          <div class="form-TextInput-dashboard">
          
              <select
              name="HOSPITAL"
              value={props.hospital} // THIS value dosent update!
              onChange={handleChange}
              required
              >
                <option value="Akershus universitetssykehus">Akershus universitetssykehus</option>
                <option value="Bærum sykehus">Bærum sykehus</option>
                <option value="Drammen sykehus">Drammen sykehus</option>
                <option value="Finnmarkssykehuset">Finnmarkssykehuset</option>
                <option value="Flekkefjord sykehus">Flekkefjord sykehus</option>
                <option value="Førde sentralsjukehus">Førde sentralsjukehus</option>
                <option value="Harstad sykehus">Harstad sykehus</option>
                <option value="Haugesund sjukehus">Haugesund sjukehus</option>
                <option value="Haukeland universitetssykehus">Haukeland universitetssykehus</option>
                <option value="Helgelandssykehuset">Helgelandssykehuset</option>
                <option value="Kongsberg sykehus">Kongsberg sykehus</option>
                <option value="Kristiansund sjukehus">Kristiansund sjukehus</option>
                <option value="Molde sjukehus">Molde sjukehus</option>
                <option value="Narvik sykehus">Narvik sykehus</option>
                <option value="Nordlandssykehuset Vesterålen">Nordlandssykehuset Vesterålen</option>
                <option value="Nordlandssykehuset">Nordlandssykehuset</option>
                <option value="Oslo universitetssykehus">Oslo universitetssykehus</option>
                <option value="Ringerike sykehus">Ringerike sykehus</option>
                <option value="Sørlandet sykehus">Sørlandet sykehus</option>
                <option value="St. Olavs hospital">St. Olavs hospital</option>
                <option value="Stavanger universitetssjukehus">Stavanger universitetssjukehus</option>
                <option value="Stord sjukehus">Stord sjukehus</option>
                <option value="Sykehuset i Vestfold">Sykehuset i Vestfold</option>
                <option value="Sykehuset Innlandet">Sykehuset Innlandet</option>
                <option value="Sykehuset Levanger">Sykehuset Levanger</option>
                <option value="Sykehuset Namsos">Sykehuset Namsos</option>
                <option value="Sykehuset Østfold">Sykehuset Østfold</option>
                <option value="Sykehuset Telemark">Sykehuset Telemark</option>
                <option value="Universitetssykehuset Nord-Norge">Universitetssykehuset Nord-Norge</option>
                <option value="Volda sjukehus">Volda sjukehus</option>
                <option value="Voss sjukehus">Voss sjukehus </option>
                <option value="Ålesund sjukehus">Ålesund sjukehus</option>
                <option value="Global">Global </option>

              </select>
            
          </div>
        </div>

        )
    }


    return(

        <div class="dashboard-menu">
    
          {/* menu toggle */}
          {/* <div class="container-fluid"> */}
    
            {/* // select with value */}

            <button
            className="btn btn-lg btn-outline-secondary" 
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick= {toggleMenu}
            >
            <i class="fas fa-bars"></i>
            </button>

    
          {/* </div>   */}
        {showMenu ? null : <SelectMenu hospital={props.hospital}/>}
        {showMenu ? <Dropdown /> : null}
      </div>  
    )
}

export default DashboardMenu