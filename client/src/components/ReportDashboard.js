import React, { Component } from 'react';



// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function ReportDashboard() {

    return (
        <div className="app" >
  
        {/* method="post" action="/" >  */}
        <form>
        
        <div class="grid-MainContainer">
  
        <div class="grid-FormContainer" > 
          
  
            <div class="CheckBoxContainer" style="color:green">
              <label>           
                <input
                  type="radio"
                  name="WORK_SHIFT"
                  value="1"
                />
                <span class="checkmark"> D</span>   
              </label>
            </div>       
        </div>
        </div>
        </form>
        </div>
    )
};

export default ReportDashboard;