// server.js
const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

// ## MiddleWare ##

// cross data server/client
var cors = require('cors');
app.use(cors());

// Routes
const postRouter = require('./src/routes/post.router');
const dataRouter = require('./src/routes/data.router')

// Our DB Configuration
require('./src/database');

// readable formats
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

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
