import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-main">

        <NavLink to="/"> 
          <button className="navbarbutton"><h1>Patient Reg.</h1></button>
        </NavLink>
        

        <NavLink to="/NasStage2">
          <button className="navbarbutton"><h1>Personnel Reg.</h1></button>
        </NavLink>

        <NavLink to="/CheckData">
          <button className="navbarbutton"><h1>Data Validation</h1></button>
        </NavLink>

        <NavLink to="/ReportDashboard">
          <button className="navbarbutton"><h1>Report Dashboard</h1></button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
