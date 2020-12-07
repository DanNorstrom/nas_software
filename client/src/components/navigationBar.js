// import React, { Component } from 'react';

// function navigationBar() {
//     return (
//     <div class="grid-MainContainer">
//     </div>  
//     )
// }
// export default navigationBar

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="grid-MainContainer">
      <div class="grid-FormContainerMenu"> 

        <NavLink to="/"> 
          <h1>NAS Appendix 1</h1>
        </NavLink>
        

        <NavLink to="/NasStage2">
        <h1>Personnel Registration</h1>
        </NavLink>

        <NavLink to="/ReportDashboard">
          <h1>Reports</h1>
        </NavLink>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
