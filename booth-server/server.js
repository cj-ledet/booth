const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
	  origin: "*"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
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

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}.`);
});
