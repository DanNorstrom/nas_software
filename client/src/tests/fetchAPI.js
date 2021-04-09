
import fetch from "node-fetch";

import globals from '../globals.js' // << globals.js path




  var requestOptionsAWS = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  getItems() //.bind(this)



  function getItems() {

    console.log(globals.development_mode)
    // access elastic EC2 instance public IP
    fetch("http://checkip.amazonaws.com/", requestOptionsAWS)
    .then((response) => {
      console.log(response)
      return response.text()
    })
    .then((IP) => {
      console.log(IP)

      // check dev flag
      if (globals.development_mode){
        IP = "localhost"
      }

      fetch("http://"+IP.trim()+":8080/posts/stage1raw/")
      .then(res => res.json())
      .then(json => {
 
    });   

            
    })
    .catch(function(error) { 
      console.log('Requestfailed', error)
    });

  }

