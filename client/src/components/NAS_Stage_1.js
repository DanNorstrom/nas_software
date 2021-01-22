import React, { Component } from 'react';



// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function NAS_STAGE_1() {

  const [state, setState] = React.useState({ 
    PATIENT_ID: "",
    ROOM_NR: "",
    WORK_SHIFT: "",
    TIME_IN: "",//"2012-04-23T18:25:43.511Z",     // for now, add fields with time format conversion later
    TIME_OUT: "",//"2012-04-24T22:25:43.511Z",
    DATE: "",
    BA1A: false,
    BA1B: false,
    BA1C: false,
    BA2: false,
    BA3: false,
    BA4A: false,
    BA4B: false,
    BA4C: false,
    BA5: false,
    BA6A: false,
    BA6B: false,
    BA6C: false,
    BA7A: false,
    BA7B: false,
    BA8A: false,
    BA8B: false,
    BA8C: false,
    BA9: false,
    BA10: false,
    BA11: false,
    BA12: false,
    BA13: false,
    BA14: false,
    BA15: false,
    BA16: false,
    BA17: false,
    BA18: false,
    BA19: false,
    BA20: false,
    BA21: false,
    BA22: false,
    BA23: false
  });

    function handleChange(evt) {
      const value =
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
      setState({
        ...state,
        [evt.target.name]: value
      });
    }


    function formSubmit(evt) {
      console.log(JSON.stringify(state));   // log to
      evt.preventDefault();   //prevent default submit behavior.

      // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
      body: JSON.stringify(state) //JSON.stringify(state)
    };

    fetch('http://localhost:8080/posts/stage1/', requestOptions)
        //.then(response => response.json())
        //.then(data => this.setState({ postId: data.id }));

      console.log(state)
    }

    return (
      <div className="app" >

      {/* method="post" action="/" >  */}
      <form onSubmit={formSubmit}>
      
      <div class="grid-MainContainer">

      <div class="grid-FormContainer"> 
        <div class="form-TextInput">
            <input
              type="text"
              name="PATIENT_ID"
              value={state.PATIENT_ID}
              onChange={handleChange}
              placeholder="Patient ID"
            />
        </div>

          <div class="CheckBoxContainer">
            <label>           
              <input
                type="radio"
                name="WORK_SHIFT"
                value="1"
                checked={state.WORK_SHIFT === "1"}
                onChange={handleChange}
              />
              <span class="checkmark"> D</span>   
            </label>
          </div>       
      </div>

        <div class="grid-FormContainer">

            <div class="form-TextInput">
            <input
              type="text"
              name="ROOM_NR"
              value={state.ROOM_NR}
              onChange={handleChange}
              placeholder="Room Number"
            />
            </div>


            <div class="CheckBoxContainer">
              <label>           
                <input
                  type="radio"
                  name="WORK_SHIFT"
                  value="2"
                  checked={state.WORK_SHIFT === "2"}
                  onChange={handleChange}
                />
                <span class="checkmark"> A</span>   
              </label>
            </div>
        </div>



        <div class="grid-FormContainer" > 

        <div class="form-TextInput">
            <input
              type="date"
              name="DATE"
              value={state.DATE}
              onChange={handleChange}
            />
          </div>

            <div class="CheckBoxContainer">
            <label>           
              <input
                type="radio"
                name="WORK_SHIFT"
                value="3"
                checked={state.WORK_SHIFT === "3"}
                onChange={handleChange}
              />
            <span class="checkmark"> N</span>   
            </label>
            </div>
        </div>




        <div class="grid-FormContainer2" > 

        <div class="form-TextInput">
            <input
              type="time"
              name="TIME_IN"
              //placeholder="Time in HH:MM 24h"
              min="00:00"
              max="24:00"
              value={state.TIME_IN}
              onChange={handleChange}
            />
        </div>
        <div class="form-TextInput">
            <input
              type="time"
              name="TIME_OUT"
              //placeholder="Time out HH:MM 24h"
              value={state.TIME_OUT}
              onChange={handleChange}
            />
        </div>

        </div>


        
        </div>



        





        

        <div class="grid-MainContainer">

        <div class="grid-FormContainer1">
        <h1>1 Monitoring and titration</h1>
        </div>

        

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                Hourly Vital signs, regular registration and calculation of fluid balance
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA1A"
                value={state.BA1A}
                onChange={handleChange}
              />
            <span class="checkmark"> 1A</span>   
            </label>
            </div>
          </div>


          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                Present at bedside and continuous observation or active 2 hrs or more in any shift, for reasons of safety, severity, or therapy such as noninvasive mechanical ventilation,
                weaning procedures, restlessness, mental disorientation, prone position, donation procedures,
                preparation and administration of fluids or medication, assisting specific procedures. 
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA1B"
                value={state.BA1B}
                onChange={handleChange}
              />
            <span class="checkmark"> 1B</span>   
            </label>
            </div>
          </div>


          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                Hourly Vital signs, regular registration and calculation of fluid balance
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA1C"
                value={state.BA1C}
                onChange={handleChange}
              />
            <span class="checkmark"> 1C</span>   
            </label>
            </div>
          </div>

          


          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                Laboratory, biochemical and microbiological investigations
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA2"
                value={state.BA2}
                onChange={handleChange}
              />
            <span class="checkmark"> 2</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                Medication, vasoactive drugs excluded
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA3"
                value={state.BA3}
                onChange={handleChange}
              />
            <span class="checkmark"> 3</span>   
            </label>
            </div>
          </div>

          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>4 Hygiene procedures</h1>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                Performing hygiene procedues such as dressing of wounds and intravascular catheters, changing linen, washing patient, incontinence,vomiting, burns, leaking wounds, complex surgical dressing with irrigation, and special procedures (e.g. barrier nursing, cross-infection related, room cleaning following instructions, staff hygiene)
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA4A"
                value={state.BA4A}
                onChange={handleChange}
              />
            <span class="checkmark"> 4A</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                The performance of hygiene procedures took 2 hrs in and shift
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA4B"
                value={state.BA4B}
                onChange={handleChange}
              />
            <span class="checkmark"> 4B</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                The performance of hygiene procedures took 4 hrs in and shift
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA4C"
                value={state.BA4C}
                onChange={handleChange}
              />
            <span class="checkmark"> 4C</span>   
            </label>
            </div>
          </div>


          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
                Care of drains, all (except gastric tube)
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA4D"
                value={state.BA4D}
                onChange={handleChange}
              />
            <span class="checkmark"> 5</span>   
            </label>
            </div>
          </div>

          
          </div>
          <div class="grid-MainContainer">

          <div class="grid-FormContainer1">
          <h1>6 Mobilization and positioning </h1>
          including procedures such as: turning the patient: mobilizing of the patient; moving from bed to chair; team lifting (e.g. immobile patient, traction, prone position)
          </div>
          
          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Performing procedure(s) up to three times per 24 hrs
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA6A"
                value={state.BA6A}
                onChange={handleChange}
              />
            <span class="checkmark"> 6A</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Performing procedure(s) more frequently than three times per 24 hrs, or with two nurses, any frequency
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA6B"
                value={state.BA6B}
                onChange={handleChange}
              />
            <span class="checkmark"> 6B</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Performing procedure with three or more nurses, any frequency
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA6C"
                value={state.BA6C}
                onChange={handleChange}
              />
            <span class="checkmark"> 6C</span>   
            </label>
            </div>
          </div>

          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>7. Support and care of relatives and patient</h1>
          including procedures such as telephone calls, interviews, counseling; often, the support and care of either relatives or patient allows staff to continue with other nursing activities (e.g. communication with patients during hygiene procedures, communication with relatives while present at bedside, and observing patient)
          </div>
        
        <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Support and care of either relatives or patient requiring full dedication for about 1 hrs in any shift such as to explain clinical condition, dealing with pain and distress, difficult family circumstances
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA7A"
                value={state.BA7A}
                onChange={handleChange}
              />
            <span class="checkmark"> 7A</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Support and care of either relatives or patient requiring full dedication for 3 hrs or more in any such shift such as death, demanding circumstances (e.g., large number of relatives, language problems, hostile relatives)
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA7B"
                value={state.BA7B}
                onChange={handleChange}
              />
            <span class="checkmark"> 7B</span>   
            </label>
            </div>
          </div>

          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>8 Administrative and managerial tasks</h1>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Performing routine tasks such as processing of clinical data, ordering examinations, professional exchange of information (e.g., ward rounds)
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA8A"
                value={state.BA8A}
                onChange={handleChange}
              />
            <span class="checkmark"> 8A</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Performing administrative and managerial tasks requiring full dedication for about 2 hrs in any shift such as research activities, protocols in use, admission and discharge procedures
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA8B"
                value={state.BA8B}
                onChange={handleChange}
              />
            <span class="checkmark"> 8B</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Performing administrative and managerial tasks requiring full dedication for about 4 hrs or more of the time in any shift as death and organ donation procedures, coordination with other disciplines
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA8C"
                value={state.BA8C}
                onChange={handleChange}
              />
            <span class="checkmark"> 8C</span>   
            </label>
            </div>
          </div>

          

          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>Ventilatory Support</h1>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Respiratory support: any form of mechanical ventilation/assisted ventilation with or without positive end-expiratory pressure, with or without muscle relaxants, spontaneous breathing with or without positive end-expiratory pressure with or without endotracheal tube supplementary oxygen by any method 
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA9"
                value={state.BA9}
                onChange={handleChange}
              />
            <span class="checkmark"> 9</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Care of artificial airways: endotracheal tube or tracheostomy cannula
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA10"
                value={state.BA10}
                onChange={handleChange}
              />
            <span class="checkmark"> 10</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Treatment for improving lung function: thorax physiotherapy, incentive spirometry, inhalation therapy, intratracheal suctioning
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA11"
                value={state.BA11}
                onChange={handleChange}
              />
            <span class="checkmark"> 11</span>   
            </label>
            </div>
          </div>

          
          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>Cardiovascular support</h1>
          </div>
          

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Vasoactive medication, disregard type and dose
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA12"
                value={state.BA12}
                onChange={handleChange}
              />
            <span class="checkmark"> 12</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Intravenous replacement of large fluid losses. Fluid administration 3 L/m2/day, irrespective of type of fluid administrated
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA13"
                value={state.BA13}
                onChange={handleChange}
              />
            <span class="checkmark"> 13</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Left atrium monitoring: pulmonary artery catheter with or without cardiac output measurement
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA14"
                value={state.BA14}
                onChange={handleChange}
              />
            <span class="checkmark"> 14</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Cardiopulmonary resuscitation after arrest, in the past period of 24 hrs (single precordial thump not included)
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA15"
                value={state.BA15}
                onChange={handleChange}
              />
            <span class="checkmark"> 15</span>   
            </label>
            </div>
          </div>

        
        </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>Renal support</h1>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Hemofiltration techniques, dialysis techniques
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA16"
                value={state.BA16}
                onChange={handleChange}
              />
            <span class="checkmark"> 16</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Quantitative urine output measurement (e.g., by indwelling urinary catheter)
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA17"
                value={state.BA17}
                onChange={handleChange}
              />
            <span class="checkmark"> 17</span>   
            </label>
            </div>
          </div>

          
          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>Neurologic support</h1>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Measurement of intracranial pressure
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA18"
                value={state.BA18}
                onChange={handleChange}
              />
            <span class="checkmark"> 18</span>   
            </label>
            </div>
          </div>

          
          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>Metabolic support</h1>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Treatment of complicated metabolic acidosis/alkalosis
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA19"
                value={state.BA19}
                onChange={handleChange}
              />
            <span class="checkmark"> 19</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Intravenous hyperalimentation
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA20"
                value={state.BA20}
                onChange={handleChange}
              />
            <span class="checkmark"> 20</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Enteral feeding through gastric tube or other gastrointestinal route (e.g., jejunostomy)

              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA21"
                value={state.BA21}
                onChange={handleChange}
              />
            <span class="checkmark"> 21</span>   
            </label>
            </div>
          </div>

        
        </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>Specific interventions</h1>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Specific intervention(s) in the intensive care unit: endotracheal intubation, insertion of pacemaker, cardioversion, endoscopies, emergency surgery in the previous 24 hrs, gastric lavage; routine interventions without direct consequences to the clinical condition of the patient, such as: radiographs, echography, electrocardiogram, dressings, or insertion of venous or arterial catheters, are not included
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA22"
                value={state.BA22}
                onChange={handleChange}
              />
            <span class="checkmark"> 22</span>   
            </label>
            </div>
          </div>

          <div class="grid-CheckBoxContainer">
            <div className="heading">
              <span>
               Specific interventions outside the intensive care unit: surgery or diagnostic procedures
              </span>
            </div>
            <div class="CheckBoxContainer">
            <label>           
              <input
                type="checkbox"
                name="BA23"
                value={state.BA23}
                onChange={handleChange}
              />
            <span class="checkmark"> 23</span>   
            </label>
            </div>
          </div>

          
          </div>
          <div class="grid-MainContainer">


          <div class="grid-FormContainer1">
          <h1>further notes</h1>
          In the items 1, 4, 6, 7 and 8, only one subitem (a, b, or c) can be scored; the weights represents the percentage of time spent by one nurse on the activity mentioned in the item, if performed.
          </div>







          {/* submit button */}
          <div className="grid-FormContainer1">
              <span>
          <button type="submit" >Submit</button>
          </span>
          </div>

            
      </div>
      </form>

        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    );
}


  export default NAS_STAGE_1;

//     // change values while in form
//     this.onValueChange = this.onValueChange.bind(this);
//     // submit prop post to API
//     this.formSubmit = this.formSubmit.bind(this);
//   }

//   onValueChange(event) {
//     this.setState({
//       selectedOption: event.target.value
//     });
//   }

//   formSubmit(event) {
//     event.preventDefault();
//     console.log(this.state.selectedOption)
//   }

//   render() {
//     return (
//       <form onSubmit={this.formSubmit}>
//         <div className="radio">
//           <label>
//             <input
//               type="radio"
//               value="1"
//               checked={this.state.selectedOption === "1"}
//               onChange={this.onValueChange}
//             />
//             Morning
//           </label>
//         </div>
//         <div className="radio">
//           <label>
//             <input
//               type="radio"
//               name
//               value="2"
//               checked={this.state.selectedOption === "2"}
//               onChange={this.onValueChange}
//             />
//             Female
//           </label>
//         </div>
//         <div className="radio">
//           <label>
//             <input
//               type="radio"
//               value="Other"
//               checked={this.state.selectedOption === "Other"}
//               onChange={this.onValueChange}
//             />
//             Other
//           </label>
//         </div>
//         <div>
//           Selected option is : {this.state.selectedOption}
//         </div>
//         <button className="btn btn-default" type="submit">
//           Submit
//         </button>
//       </form>
//     );
//   }
// }


// export default NAS_STAGE_1;

// function NAS_STAGE_1() {
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");

//     return (
//         <form>
//             <div className="formRow">
//             <label htmlFor="email">Email address</label>
//             <input
//                 type="email"
//                 name="email"
//                 className="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             />
//             </div>
//             <div className="formRow">
//             <label htmlFor="password">Password</label>
//             <input
//                 type="password"
//                 name="password"
//                 className="password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//             />
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
// export default NAS_STAGE_1;