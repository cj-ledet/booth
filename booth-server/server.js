const https = require('https');
const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
	  origin: "*" //"https://boothtickets.com"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  res.json({message: "testing"});
});

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync() 
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/ticket.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set up HTTPS server
const options = {
  key: fs.readFileSync('/etc/apache2/certs/private.key.pem'),
  cert: fs.readFileSync('/etc/apache2/certs/domain.cert.pem')
};

//set port, listen for requests
const PORT = process.env.PORT || 8080;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

