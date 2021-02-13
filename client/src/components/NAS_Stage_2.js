import React, { Component } from 'react';


    //#"react": "^17.0.1",
    //"react-dom": "^17.0.1",

function NAS_STAGE_2() {

  const [state, setState] = React.useState({ 
    Personnel_D: "",
    Personnel_A: "",
    Personnel_N: "",
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

    fetch('http://localhost:8080/posts/stage2/', requestOptions)
        //.then(response => response.json())
        //.then(data => this.setState({ postId: data.id }));

      console.log(state)
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


  export default NAS_STAGE_2;
