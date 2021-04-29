import React, { Component } from 'react';
import globals from '../globals.js' // << globals.js path
import { SolarSystemLoading as Loading } from 'react-loadingg';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

// take nas stage 1 input from nurses once per patient per shift.
// and save to stage1 collection
function NAS_STAGE_1() {

  const [state, setState] = React.useState({ 
    PATIENT_ID: "",
    ROOM_NR: "",
    WORK_SHIFT: "",
    HOSPITAL: "Akershus universitetssykehus",     // initial form select doesnt trigger onChange()
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

    // async?
    function handleChange(evt) {

      // act as radio instead of checkbox (we cant use radio bc we want to keep all the data in the JSON format)
      const letterList = ['A','B','C']
      var resList = {}

      // is a simulated "radio" type checkbox
      if (letterList.includes((evt.target.name).slice(-1))) {
        // ask god why this iterates over indexes instead of obj's
        for (var s in letterList){
          var target_var = (evt.target.name).substring(0, (evt.target.name).length-1)
          target_var  += letterList[s]

          // uncheck other boxes and reset state value
          if (target_var != [evt.target.name]){
            // uncheck other boxes
            try{
              document.querySelectorAll("input[name="+target_var+"]")[0].checked = false;
              // set false for other boxes
              resList[target_var] = false
            }
            catch(err) {
              // no action required as this data dosent exist
            }
  
          }
          // 
          else{
            console.log('yes')
            // check if the checkbox is checked or unchecked
            const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
            // check true or false depending on checked state
            resList[evt.target.name] = value

          }
        }
        // we cant set state inside the ifelse loop, we move it out
        setState({
              ...state,...resList
            });
      }
      // is anything else then a simulated radio checkbox
      else{
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

      // assign the checked value to true
      // const value =
      //   evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
      // setState({
      //   ...state,
      //   [evt.target.name]: value
      // });
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

    // access elastic EC2 instance public IP
    // fetch("http://checkip.amazonaws.com/", requestOptions)
    // .then(function(response) {
    //   console.log(response.text())
    //   return response.text()
    // })
    // .then(function(IP) {

    //   // check dev flag
    //   if (globals.development_mode){
    //     IP = "localhost"
    //   }
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
    fetch("http://"+IP+":8080/posts/stage1/", requestOptions)
    .then(response => response.json())
    .then(response => {
      if (response.success){
        alert(   
          'Success: '+response.success +'\n\n'
        +'Message:\n'+ response.message);
      }
      else{
        alert(   
          'Success: '+response.success +'\n\n'
        +'Error:\n'+ response.error + '\n\n'
        +'Message:\n'+ response.message);
      }
    })

    })
    .catch(function(error) { 
      console.log('Requestfailed', error)
    });
  
    

    }
    // .then(response => {
    //   console.log(response)
    //   if(!response.success) throw new Error(response);
    //     else return response.json();
    //   })

    // .then((data) => {
    //   alert(data.response)
    // })
    
    // .catch((error) => {
    //   alert(   
    //      'Success '+error.success +'\n'
    //     +'Error:'+ error.error + '\n'
    //     +'Message:'+ error.message);

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
              required
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
              required
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
              class="form-TextInput"
              type="date"
              name="DATE"
              value={state.DATE}
              onChange={handleChange}
              required
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




        <div class="grid-FormContainer1-full" > 
          <div class="form-TextInput">
              <select
              name="HOSPITAL"
              // value={state.TIME_IN}
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
                <option value="Voss sjukehus">Voss sjukehus</option>
                <option value="Ålesund sjukehus">Ålesund sjukehus</option>

              </select>
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
              required
            />
        </div>
        <div class="form-TextInput">
            <input
              type="time"
              name="TIME_OUT"
              //placeholder="Time out HH:MM 24h"
              value={state.TIME_OUT}
              onChange={handleChange}
              required
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
              <span class="spanbox">
              <b>Hourly vital signs, regular registration and calculation of fluid balance</b>
              <br></br><br></br>
<a>Patients who require NORMAL monitoring, according to the ICU routine, of vital signs, application of assessment scales (pain, RASS,
Glasgow), water balance control (including nasogastric and nasoenteral tubes) and who do not need frequent alterations in treatment,
therapy or monitoring intensification. Assisted oral feeding.</a>
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
            <span class="spanbox">
              <b>Present at bedside and continuous observation or active for 2 hours or more in any shift, for reasons of safety, severity or therapy,
such as: non-invasive mechanical ventilation, weaning procedures, restlessness, mental disorientation, prone position, donation
procedures, preparation and administration of fluids and/or medication, assisting specific procedures.</b>
              <br></br><br></br>
              <a>Patients who require intensified monitoring (MORE THAN NORMAL) due to alterations in the clinical condition, hemodynamic instability,
oliguria, bleeding, dyspnea, fever, alteration in the level of consciousness, measurements in the assessment scales higher than the ICU standard,
measurement of central venous pressure, invasive arterial pressure, intra-abdominal pressure, use of sedatives or long-term use of insulin, ventilator
support, non-invasive mechanical ventilation or alteration of the ventilator parameters, preparation of fluids and emergency medication. Patient
is stable after the therapeutic behavior adopted. Immediate post-operative care after cardiac surgery or major surgery, where the patient remains
stable. Invasive procedures with intercurrences. Extubation without intercurrences. Assisted oral feeding that demands more time than normal.</a>
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
            <span class="spanbox">
              <b>Present at bedside and active for 4 hours or more in any shift for reasons of safety, severity or therapy, such as those examples above (1b).</b>
              <br></br><br></br>
              <a>Critical patients who require MUCH MORE THAN NORMAL monitoring, in at least one shift in 24 hours, without stabilization after the
therapeutic interventions adopted, requires continuous nursing presence. Alterations described in the “MORE THAN NORMAL” category,
however with a greater frequency and the need for interventions. Hemodialysis with intercurrence, requiring nursing intervention (when
hemodialysis is performed by ICU staff). Unstable patients in immediate postoperative care after cardiac surgery or major surgery.</a>
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
            <span class="spanbox">
              <b>LABORATORY: Biochemical and microbiological investigations.</b>
              <br></br><br></br>
              <a>Patients submitted to any biochemical or microbiological exam, regardless of the quantity, performed at bedside by a nursing professional,
including capillary glucose. E.g.: HGT, glycosuria, tracing cultures, blood gas analysis, among others. This item should not be scored if the
laboratory collector or physician performs the collection.</a>
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
            <span class="spanbox">
              <b>MEDICATION: Vasoactive drugs excluded.</b>
              <br></br><br></br>
              <a>Patients who received any type of medication, regardless of the route and dose. Vasoactive drugs will be scored in a specific item (item 12).</a>
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
            <span class="spanbox">
              <b>HYGIENE PROCEDURES</b>
              <br></br><br></br>
              <a>Performing hygiene procedures such as: dressing of wounds and intravascular catheters, changing linen, washing patient, incontinence,
vomiting, burns, leaking wounds, complex surgical dressing with irrigation, special procedures (e.g. barrier nursing, cross-infection
related, room cleaning following infections, staff hygiene) and especially obese patients, etc.</a>
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
            <span class="spanbox">
              <b>The performance of hygiene procedures took more than 2 hours in any shift.</b>
              <br></br><br></br>
              <a>Patients who were submitted, in MORE THAN NORMAL frequency, to one of the hygiene procedures mentioned above in at least one shift
in 24 hours. Vascular catheter dressing twice a day; medium dressing for pressure ulcer, dressing a surgical incision twice a day, medium
dressing (with suture dehiscence); changing linen twice in 24h; washing of unstable patients by three professionals; body hygiene twice per
shift. Fecal incontinence three times a day. Patients in isolation.</a>
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
            <span class="spanbox">
              <b>The performance of hygiene procedures took more than 4 hours in any shift.</b>
              <br></br><br></br>
              <a>4c The performance of hygiene procedures took more than 4 hours in any shift.
Patients who were submitted, in MUCH MORE THAN NORMAL frequency, to one of the hygiene procedures mentioned above in at least
one shift in 24 hours. Extensive, complex, open cavity dressing or ≥three times a day.</a>
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
            <span class="spanbox">
              <b>CARE OF DRAINS - All (except gastric tube).</b>
              <br></br><br></br>
              <a>Patients with any type of drain or tube with the aim of draining. Including long-term catheter, external ventricular drain (EVD), thorax
drain, among others. EXCLUDING gastric tubes (nasogastric, nasoenteral, gastrostomies and others), which should be considered in
item 1 or 21.</a>
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
            <span class="spanbox">
              <b>MOBILIZATION AND POSITIONING</b>
              <br></br><br></br>
              <a>Patients who require mobilization and positioning up to three times in 24 hours.</a>
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
            <span class="spanbox">
              <b>Performing procedures(s) more frequently than 3 times per 24 hours, or with 2 nurses – any frequency.</b>
              <br></br><br></br>
              <a>Patients who require mobilization and positioning, as described in item 6, which have been performed more than three times in 24 hours or
by two members of the nursing staff in at least one shift in 24 hours.</a>
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
            <span class="spanbox">
              <b>Performing procedure with three or more nurses – any frequency.</b>
              <br></br><br></br>
              <a>Complex mobilization and positioning as per the procedure described in item 6, which have been performed by three or more members of
the nursing staff, in any frequency, in at least one of the shifts in 24 hours.</a>
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
            <span class="spanbox">
              <b>SUPPORT AND CARE OF RELATIVES AND PATIENT</b>
              <br></br><br></br>
              <a>Including procedures such as telephone calls, interviews, counseling. Often, the support and care of either relatives or patient allow staff to
continue with other nursing activities (e.g.: communication with patients during hygiene procedures, communication with relatives whilst
present at bedside and observing patient).</a>
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
            <span class="spanbox">
              <b>Support and care of either relatives or patient requiring full dedication for about one hour in any shift such as: to explain clinical
condition, dealing with pain and distress, difficult family circumstances.
              </b>
              <br></br><br></br>
              <a>This item receives a score when guidance or instructions are given to patients and/or their families, providing emotional support with full
dedication of a nurse from the staff, with NORMAL duration, according to the routine established in the unit, in at least one shift in 24 hours.</a>
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
            <span class="spanbox">
              <b>Performing routine tasks such as: processing of clinical data, ordering examinations, professional exchange of information (e.g.: ward rounds).</b>
              <br></br><br></br>
              <a>Including records performed as nursing process and/or shift change, multidisciplinary rounds or administrative and managerial tasks related
to patients, with NORMAL duration.</a>
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
            <span class="spanbox">
              <b>Performing administrative and managerial tasks requiring full dedication for about 2 hours in any shift such as: research activities,
protocols in use, admission and discharge procedures.</b>
              <br></br><br></br>
              <a>Including records performed as part of nursing process and/or shift change, multidisciplinary rounds or administrative and managerial
tasks related to patients, with MORE THAN NORMAL duration. Admission of patients in immediate postoperative period, unstable patients
who require more extensive records. Need for providing materials and equipment. Assembly of the hemodialysis machine, application of
protocols such as ECLS, transplantation, others. When the nurse needs help from a colleague to perform his/her activities. E.g.: the nurse
continues assisting a patient and a colleague takes over the administrative tasks.</a>
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
            <span class="spanbox">
              <b>Performing administrative and managerial tasks requiring full dedication for about 4 hours or more of the time in any shift such as:
death and organ donation procedures, co-ordination with other disciplines.</b>
              <br></br><br></br>
              <a>Including any administrative and managerial task related to the patient, with MUCH MORE THAN NORMAL duration, according to the
routine established in the unit. Critical, unstable patients who require intense records. Detailed shift change records, multidisciplinary
rounds, organization of special materials and equipment for patient care, surgical procedures at bedside, protocols such as transplantation,
ECLS, ventricular assist devices, teaching and supervising education/training.</a>
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
            <span class="spanbox">
              <b>Respiratory support: Any form of mechanical ventilation/assisted ventilation with or without positive end-expiratory pressure,
with or without muscle relaxants; spontaneous breathing with positive end-expiratory pressure (e.g. CPAP or BiPAP), with or without
endotracheal tube; supplementary oxygen by any method.</b>
              <br></br><br></br>
              <a>Patients making use of any respiratory support, from nasal catheter to mechanical ventilation.</a>
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
            <span class="spanbox">
              Care of artificial airways. Endotracheal tube or tracheostomy cannula.
Patients making use of orotracheal or nasotracheal tube or tracheostomy.
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
            <span class="spanbox">
              <b>Treatment for improving lung function. Lung physiotherapy, incentive spirometry, inhalation therapy, intratracheal suctioning.</b>
              <br></br><br></br>
            <a>Patients who underwent treatment to improve their pulmonary function, performed in any frequency by the nursing staff. Aspiration with
open or closed system and nebulization.</a>
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
            <span class="spanbox">
              <b>Vasoactive medication, irrespective of type or dose.</b>
              <br></br><br></br>
              <a>
Patients who have received any vasoactive medication, regardless of the type and dose and who need intensive monitoring in their
endovenous use: Sodium Nitroprusside, Vasopressin, Prostaglandin, Norepinephrine, Epinephrine, Dopamine, Dopexamine, Dobutamine,
Isoproterenol, Phenylephrine, Nitroglycerin, Clonidin hydrochloride. Metoprolol and Propranolol (beta blockers) should be scored.</a>
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
            <span class="spanbox">
              <b>Intravenous replacement of large fluid losses. Fluid administration 3 l/m2/day, irrespective of type of fluid administered. 
              </b>
              <br></br><br></br>
              <a>
              Patients who have received fluid replacement greater than 4.5 liters of solution per day, irrespective of the type of fluid administered.
              </a>
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
            <span class="spanbox">
              <b>Left atrium monitoring. Pulmonary artery catheter with or without cardiac output measurement.</b>
              <br></br><br></br>
              
<a>Patients making use of pulmonary artery catheter (Swan-Ganz catheter). Including the use of cardiac pacemaker, intra-aortic balloon
pumping, cardiac output monitoring, extracorporeal life support (ECLS), ventricular assist devices.</a>              </span>
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
            <span class="spanbox">
              <b>Cardiopulmonary resuscitation after arrest; in the past 24 hours (single precordial thump not included).</b>
              <br></br><br></br>
              <a>
Patients who suffered a heart problems and were submitted to cardiopulmonary resuscitation, independently of the environment where the
cardiac arrest took place. This item should be scored only once in 24 hours.</a>
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
            <span class="spanbox">
              <b>Hemofiltration techniques. Dialysis techniques.</b>
              <br></br><br></br>
              <a>
Patients who have received any type of intermittent or continuous dialytic procedure.</a>
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
            <span class="spanbox">
              <b>Qantitative urine output measurement (e.g.: by indwelling urinary catheter).</b>
              <br></br><br></br>
              <a>
              Patients who require diuresis control, in milliliters, with or without any type of urinary device
              </a>
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
            <span class="spanbox">
              <b>Measurement of intracranial pressure.</b>
              <br></br><br></br>
              <a>
Patients submitted to intracranial pressure monitoring, jugular bulb catheter or microdialysis. Do consider this item if the patient has
external ventricular drainage and assessment of ICP.</a>
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
            <span class="spanbox">
              <b>Treatment of complicated metabolic acidosis/alkalosis.</b>
              <br></br><br></br>
              <a>Patients who made use of specific medication to adjust metabolic acidosis or alkalosis, such as administration of sodium bicarbonate
in continuous or bolus infusion. Respiratory acidosis and alkalosis should not be scored in this item, neither should ventilator
correction. The item considers those conditions requiring the permanent presence of a nurse for monitoring severe physiological
deregulation and for titrating (fine-tuning) the therapy in acute conditions. During hemofiltr ation, if correction is necessary,
additional score is indicated.</a>
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
            <span class="spanbox">
              <b>Intravenous hyperalimentation.</b>
              <br></br><br></br>
              <a>Patients who receive central or peripheral venous infusion of parenteral nutrition.</a>
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
            <span class="spanbox">
              <b>Enteral feeding. Through gastric tube or other gastrointestinal route (e.g., jejunostomy).</b>
              <br></br><br></br>
              <a>Patients who receive enteral feeding through tubes, by any route of the gastrointestinal tract. Measurement of aspiration/retention included.</a>
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
            <span class="spanbox">
              <b>Specific intervention(s) in the intensi ve care unit. Endotracheal intubation, insertion of pacemaker, cardioversion,
endoscopies, emergency surgery in the past 24 hours, gastric la vage. Routine interventions without direct consequences for
the clinical condition of the patient, such as: X-rays, echography, electrocardiogram, dressing, or insertion of venous or arterial
catheters, are not included.</b>
              <br></br><br></br>
              <a>Patients submitted to a diagnostic or therapeutic intervention listed above in the ICU. Specific procedures performed in the unit and which
require active intervention of the staff can be considered in this item, including the insertion of venous or arterial catheters and spinal
puncture. Procedures performed by the nurse, such as passing a relief or indwelling urinary catheter, a nasoenteral or gastric tube, a
peripherally inserted central catheter (PICC), installation of intra-abdominal pressure, among others, that might be particular complex and
require more nursing time for their execution can also be considered.</a>
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
            <span class="spanbox">
              <b>Specific interventions outside the intensive care unit. Surgery or diagnostic procedures.</b>
              <br></br><br></br>
              <a>Patients who require diagnostic or therapeutic interventions performed outside the ICU. E.g.: tomography, radionuclide imaging, magnetic
resonance, hemodynamics (take or pick up a patient), surgical procedures (take or pick up a patient), patient transfer to any hospitalization
unit or discharge, and sending the body to the morgue.</a>
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


// export default NAS_STAGE_1;
export default withAuthenticationRequired(NAS_STAGE_1, {
  onRedirecting: () => <Loading />
});