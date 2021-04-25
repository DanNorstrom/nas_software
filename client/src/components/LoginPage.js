import React from "react";
import b1 from "../resources/globewhite.jpg"
import b2 from "../resources/tabletnurse.jpg"
import b3 from "../resources/nursestatistics.jpg"
const LoginPage = () => {

  var style1 ={
    backgroundImage: "url(" + b1 + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
  var style2 ={
    backgroundImage: "url(" + b2 + ")",
    backgroundPosition: 'left',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'white'
  }
  var style3 ={
    backgroundImage: "url(" + b3 + ")",
    backgroundPosition: 'right',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'grey'
  }


  return (
    <div className="app" >
      
      <section class="welcome-section-one" style={style1}>  
        <div class="content">
          <h1>Resize your browser and see how they adapt.</h1>
        </div>
      </section>

      <section class="welcome-section-one" style={style2} >  
        <div class="content" >
          <h1>Resize your browser and see how they adapt.</h1>
        </div>
      </section>

      <section class="welcome-section-one" style={style3}>  
        <div class="content">
          <h1>Resize your browser and see how they adapt.</h1>
        </div>
      </section>

    </div>
  )
}

export default LoginPage;
