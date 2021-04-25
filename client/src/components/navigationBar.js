import React, { useState } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Row, Col } from 'react-flexbox-grid';


import AuthenticationButton from "../auth/AuthenticationButton"
import Profile from "../view/profile"

const Navbar = () => {

  // toggle collapse main menu
  const [showMenu, setShowMenu] = React.useState(true)
  const toggleMenu = () => {
    if (showMenu) setShowMenu(false)
    else setShowMenu(true)
  }

  // toggle profile menu
  const [showProfileMenu, setShowProfileMenu] = React.useState(false)
  const toggleProfileMenu = () =>{
    if(showProfileMenu) setShowProfileMenu(false)
    else setShowProfileMenu(true)
  }

  // access history and create routing
  let history = useHistory();
  function nextPath(path) {
    history.push(path);
  }

  // access user info
  const { user } = useAuth0();
  var verified = typeof user != 'undefined'
  // const { name, picture, email } = user;

  // this becomes a JSX component?
  const Dropdown = () => {

    return(
    <div >
    <div class="btn-group d-flex" style={{width: '100%'}}>
      {/* NAVLINK <decides route for buttons */}

      <Grid fluid>
    

        <Row>
        <Col xs={12} sm={12} md={4} lg>
        <button
        className="btn btn-lg btn-outline-secondary btn-block"
        // style={{marginTop: '.5rem'}}
        data-toggle="button"
        onClick= {() => nextPath("/")}
        >
          <h>Welcome</h>
        </button></Col>

        <Col xs={12} sm={12} md={4} lg>
        <button
        className="btn btn-lg btn-outline-secondary btn-block"
        data-toggle="button"
        onClick= {() => nextPath("/NasStage1")}
        >
          <h>Patients</h>
        </button></Col>

        <Col xs={12} sm={12} md={4} lg>
        <button
        className="btn btn-lg btn-outline-secondary btn-block"
        data-toggle="button"
        onClick= {() => nextPath("/NasStage2")}
        >
          <h>Personnel</h>
        </button></Col>

        <Col xs={12} sm={12} md={4} lg>
        <button
        className="btn btn-lg btn-outline-secondary btn-block"
         data-toggle="button"
         onClick= {() => nextPath("/PeerView")}
         >
          <h>Peer-View</h>
        </button></Col>

        <Col xs={12} sm={12} md={4} lg>
        <button
        className="btn btn-lg btn-outline-secondary btn-block" 
        data-toggle="button"
        onClick= {() => nextPath("/ReportDashboard")}
        >
          <h>Dashboard</h>
        </button></Col>

        <Col xs={12} sm={12} md={4} lg>
        <button
        className="btn btn-lg btn-outline-secondary btn-block" 
        data-toggle="button"
        onClick= {() => nextPath("/Profile")}
        >
          <h>Profile</h>
        </button></Col>

        <Col xs={12} sm={12} md lg>
        {/* // login */}
        <AuthenticationButton></AuthenticationButton>
        </Col>

      </Row>
      </Grid>
    </div>
  </div>
  )

  }

  const ProfileInfo = () => {

    return(
    <div style={{
      display: 'inline-block',
      verticalAlign: 'top',
      }}>

      <div style={{
        display: 'inline-block',
        verticalAlign: 'top',
        }}>

        <a
          class="nav-link dropdown-toggle d-flex align-items-center"
          role="button"
          // onClick={toggleProfileMenu}
        >
          <img
            src={verified? user.picture: null}
            class="rounded-circle"
            height="22"
            alt=""
            loading="lazy"
          />
        </a>

    {/* this i disabled for now, it dosent work, we could have moved profile info to here */}
        {/* {showProfileMenu?
        (
        <ul class="dropdown-menu">
          <li><a class="dropdown-item">My profile</a></li>
          <li><a class="dropdown-item">Settings</a></li>
          <li><a class="dropdown-item">Logout</a></li>
        </ul>
        ) : null} */}

      </div >

      <div class="nav-email">  {/*  this class might break responsive behavior */}
        <a>
          {verified? user.email: null}
        </a>
      </div>

    </div>
    )

  }

  return (
  <div>
    <nav class="navbar navbar-dark bg-dark">

      {/* menu toggle */}
      <div class="container-fluid">

        <button
        class="navbar-toggler"
        type="button"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick= {toggleMenu}
        >
        <i class="fas fa-bars"></i>
        </button>

        {verified? <ProfileInfo />: null}
      </div>
      

    {/* dark mode slider */}


    {/* profile icon+info+logout or login */}

    </nav>
        
    {showMenu ? <Dropdown /> : null}
  </div>   
  );
};

export default withRouter(Navbar);
