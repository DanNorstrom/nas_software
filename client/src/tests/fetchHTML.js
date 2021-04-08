
import fetch from "node-fetch";

// access elastic EC2 instance public IP
fetch("http://checkip.amazonaws.com/")
.then(function(response) {
  return response.text()
})
.then((text) => {
    console.log(text);
  })
.catch(function(error) { 
    console.log('Requestfailed', error)
  });