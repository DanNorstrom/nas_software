import React, { Component } from 'react';
import globals from '../globals.js' // << globals.js path
import { SolarSystemLoading as Loading } from 'react-loadingg';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

    //#"react": "^17.0.1",
    //"react-dom": "^17.0.1",

function NAS_STAGE_2() {

  const [state, setState] = React.useState({ 
    Personnel_D: "",
    Personnel_A: "",
    Personnel_N: "",
    HOSPITAL: "Akershus universitetssykehus",
    DATE: ""
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
          fetch("http://"+IP+":8080/posts/stage2/", requestOptions)
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

    return (
      <div className="app" >

      {/* method="post" action="/" >  */}
      <form onSubmit={formSubmit}>
      
      <div class="grid-MainContainer">

      <div class="grid-FormContainer1" > 
          <div class="form-TextInput">
            <input
              type="date"
              name="DATE"
              value={state.DATE}
              onChange={handleChange}
            />
          </div>
      </div>

      <div class="grid-FormContainer1" > 
          <div class="form-TextInput">
              <select
              name="HOSPITAL"
              // value={state.TIME_IN}
              onChange={handleChange}
              required
              >
                <option value="Akershus universitetssykehus">Akershus universitetssykehus</option>
                <option value="Oslo universitetssykehus">Oslo universitetssykehus</option>
                <option value="Haukeland universitetssykehus">Haukeland universitetssykehus</option>
                <option value="Stavanger universitetssjukehus">Stavanger universitetssjukehus</option>
                <option value="St. Olavs hospital">St. Olavs hospital</option>
                <option value="Sykehuset Østfold">Sykehuset Østfold</option>
                <option value="Sykehuset i Vestfold">Sykehuset i Vestfold</option>
                <option value="Sykehuset Telemark">Sykehuset Telemark</option>
                <option value="Bærum sykehus">Bærum sykehus</option>
                <option value="Drammen sykehus">Drammen sykehus</option>
                <option value="Universitetssykehuset Nord-Norge">Universitetssykehuset Nord-Norge</option>
                <option value="Haugesund sjukehus">Haugesund sjukehus</option>
                <option value="Førde sentralsjukehus">Førde sentralsjukehus</option>
                <option value="Sykehuset Innlandet">Sykehuset Innlandet</option>
                <option value="Ålesund sjukehus">Ålesund sjukehus</option>
                <option value="Sørlandet sykehus">Sørlandet sykehus</option>
                <option value="Sykehuset Levanger">Sykehuset Levanger</option>
                <option value="Ringerike sykehus">Ringerike sykehus</option>
                <option value="Nordlandssykehuset">Nordlandssykehuset</option>
                <option value="Kristiansund sjukehus">Kristiansund sjukehus</option>
                <option value="Molde sjukehus">Molde sjukehus</option>
                <option value="Nordlandssykehuset Vesterålen">Nordlandssykehuset Vesterålen</option>
                <option value="Stord sjukehus">Stord sjukehus</option>
                <option value="Volda sjukehus">Volda sjukehus</option>
                <option value="Sykehuset Namsos">Sykehuset Namsos</option>
                <option value="Finnmarkssykehuset">Finnmarkssykehuset</option>
                <option value="Helgelandssykehuset">Helgelandssykehuset</option>
                <option value="Kongsberg sykehus">Kongsberg sykehus</option>
                <option value="Flekkefjord sykehus">Flekkefjord sykehus</option>
                <option value="Harstad sykehus">Harstad sykehus</option>
                <option value="Narvik sykehus">Narvik sykehus</option>
                <option value="Voss sjukehus">Voss sjukehus</option>

              </select>
          </div>
        </div>


        <div class="grid-FormContainer1">
          <div class="form-TextInput">
            <input
              type="number"
              min="0"
              step="1"
              name="Personnel_D"
              value={state.Personnel_D}
              onChange={handleChange}
              placeholder="Personnel Count Day:"
              required
            />
            </div>
        </div>

        <div class="grid-FormContainer1">
          <div class="form-TextInput">
            <input
              type="number"
              min="0"
              step="1"
              name="Personnel_A"
              value={state.Personnel_A}
              onChange={handleChange}
              placeholder="Personnel Count Afternoon:"
              required
            />
            </div>
        </div>

        <div class="grid-FormContainer1">
          <div class="form-TextInput">
            <input
              type="number"
              min="0"
              step="1"
              name="Personnel_N"
              value={state.Personnel_N}
              onChange={handleChange}
              placeholder="Personnel Night:"
              required
            />
            </div>
        </div>

      </div>

      <div class="grid-MainContainer">

        <div class="grid-FormContainer1">
          <h1>further notes</h1>
          Please register the available amount of nurses at the ICU at the given date.
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


// export default NAS_STAGE_2;
export default withAuthenticationRequired(NAS_STAGE_2, {
  onRedirecting: () => <Loading />,
});