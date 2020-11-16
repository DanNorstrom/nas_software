import React, { Component } from 'react';

    //#"react": "^17.0.1",
    //"react-dom": "^17.0.1",

function NAS_STAGE_1() {

  const [state, setState] = React.useState({ 
    PATIENT_ID: null,
    ROOM_NR: null,
    WORK_SHIFT: null,
    TIME_IN: null,
    TIME_OUT: null,
    DATE: null,
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
      this.setState({
        ...state,
        [evt.target.name]: value
      });
    }

    return (
      <div className="app">
        <form>
          <label>
            <div className="heading">First Name</div>
            <input
              type="text"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="heading">Last Name</div>
            <input
              type="text"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="heading">Bio</div>
            <textarea name="bio" value={state.bio} onChange={handleChange} />
          </label>
          <label>
            <div className="heading">With hooks</div>
            <input
              type="checkbox"
              name="hooks"
              checked={state.hooks}
              onChange={handleChange}
            />
          </label>
          <div>
            <div className="heading">Level</div>
            <label>
              Acolyte
              <input
                type="radio"
                name="level"
                value="acolyte"
                checked={state.level === "acolyte"}
                onChange={handleChange}
              />
            </label>
            <label>
              Master
              <input
                type="radio"
                name="level"
                value="master"
                checked={state.level === "master"}
                onChange={handleChange}
              />
            </label>
          </div>
          <label>
            <div className="heading">Favorite version</div>
            <select name="version" onChange={handleChange} value={state.version}>
              <option value="16.8">v16.8.0</option>
              <option value="16.7">v16.7.0</option>
              <option value="16.6">v16.6.0</option>
              <option value="16.5">v16.5.0</option>
            </select>
          </label>
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