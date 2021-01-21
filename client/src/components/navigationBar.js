import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="grid-MainContainer">
      <div class="menu-Container"> 

        <NavLink to="/"> 
          <button class="NavBarButton"><h1>NAS Appendix 1</h1></button>
        </NavLink>
        

        <NavLink to="/NasStage2">
          <button class="NavBarButton"><h1>Personnel Registration</h1></button>
        </NavLink>

        <NavLink to="/CheckData">
          <button class="NavBarButton"><h1>Check Data</h1></button>
        </NavLink>

        <NavLink to="/ReportDashboard">
          <button class="NavBarButton"><h1>Report Dashboard</h1></button>
        </NavLink>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
