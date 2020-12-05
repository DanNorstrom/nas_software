import React, { Component } from 'react';


    //#"react": "^17.0.1",
    //"react-dom": "^17.0.1",

function NAS_STAGE_1() {

  const [state, setState] = React.useState({ 
    PATIENT_ID: "",
    ROOM_NR: "",
    WORK_SHIFT: "",
    TIME_IN: "2012-04-23T18:25:43.511Z",     // for now, add fields
    TIME_OUT: "2012-04-24T22:25:43.511Z",
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
    BA6D: false,
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
      console.log(JSON.stringify(state));
      evt.preventDefault();   //prevent default submit behavior.

      // var request = new XMLHttpRequest();
      // request.open('POST', '/submitForm', true);
      // request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      // request.send(JSON.stringify(state, null, 2));
      //JSON.stringify(state, null, 2), state

      // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
      body: JSON.stringify(state) //JSON.stringify(state)
    };

    fetch('http://localhost:8080/posts/', requestOptions)
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
              <span class="checkmark"> M</span>   
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
        
        </div>

            {/* <div >
            <label>
              Morning-Shift
              <input
                type="radio"
                name="WORK_SHIFT"
                value="1"
                checked={state.WORK_SHIFT === "1"}
                onChange={handleChange}
              />
            </label>
            </div> */}



            {/* <label>
              Afternoon-Shift
              <input
                type="radio"
                name="WORK_SHIFT"
                value="2"
                checked={state.WORK_SHIFT === "2"}
                onChange={handleChange}
              />
            </label>
            <label>
              Night-Shift
              <input
                type="radio"
                name="WORK_SHIFT"
                value="3"
                checked={state.WORK_SHIFT === "3"}
                onChange={handleChange}
              />
            </label> */}




        <div class="grid-MainContainer">

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



          {/* submit button */}
          <div className="heading">
              <span>
          <button type="submit" >Submit</button>
          </span>
            </div>

            
      </div>

          {/* <div className="heading">
          <a>BA1Aasdasd   asdasdssssssssasd sssssssssssss         </a>
          <label class="CheckBoxContainer">
            <input
              type="checkbox"
              name="BA1B"
              value={state.BA1B}
              onChange={handleChange}
            />
          <span class="checkmark"></span>   
          </label>
          </div>

          <div className="heading">
          <a>BA1Aasdasd   asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdsssss asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdsssssssssssssssssss asdasdssssssssssss asdasdssssssssssss asdasdssssssssssss sssssssssssss         </a>
          <label class="CheckBoxContainer">
            <input
              type="checkbox"
              name="BA1C"
              value={state.BA1C}
              onChange={handleChange}
            />
          <span class="checkmark"></span>   
          </label>
          </div> */}





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