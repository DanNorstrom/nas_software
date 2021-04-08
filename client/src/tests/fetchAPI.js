import fetch from "node-fetch";
import globals from '../globals.js'
// fetch("http://"+"2.219.240.101"+":8080/posts/stage1raw/")
// .then(res => res.json())
// .then(json => {
//      console.log(json)
// });

var requestOptionsAWS = {
  method: 'GET',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json'
  }
};


    console.log(globals.development_mode)
    // access elastic EC2 instance public IP
    fetch("http://checkip.amazonaws.com/", requestOptionsAWS)
    .then((response) => {
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