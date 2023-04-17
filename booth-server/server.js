const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const fs = require('fs');

const app = express();
const port = 443;

const options = {
  key: fs.readFileSync('certs/private.key.pem'),
  cert: fs.readFileSync('certs/domain.cert.pem')
};

var corsOptions = {
	  origin: "*" //"https://boothtickets.com"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/mod', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

