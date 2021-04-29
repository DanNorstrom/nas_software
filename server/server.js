// server.js
const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;


// cross data server/client
var cors = require('cors');
app.use(cors());



// ## MiddleWare ##
// passport JS Login
// const { auth } = require('express-openid-connect');

// // this config should be moved to a hidden gitignored .env file
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'dac7e0618ac94b1b651205e2b5cbd43af2c842d4c1c05b9d643e126270f6169e',
//   baseURL: 'http://localhost:3000',
//   clientID: '5NhbgERGXLKv83STgXNBbnVNh0FWZGF2',
//   issuerBaseURL: 'https://dev-jekvb0py.eu.auth0.com'
// };
// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });






// Routes
const postRouter = require('./src/routes/post.router');
const dataRouter = require('./src/routes/data.router')

// Our DB Configuration
require('./src/database');

// readable formats
app.use(express.json({ limit: '50mb' }));

app.use(
  express.urlencoded({
    limit: '50mb', // allow bulkwrite in po
    extended: true
  })
);


// Static files
const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");
app.use(express.static(CLIENT_BUILD_PATH));


// post protocols
app.use('/posts', postRouter);

// data preprocessing controllers
app.use('/data', dataRouter)

// Server React Client
// app.get("/", function(req, res) {
//   res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
// });

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});
