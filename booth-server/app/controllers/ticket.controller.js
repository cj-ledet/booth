const db = require("../models");
const Ticket = db.tickets;
const Op = db.Sequelize.Op;
//Need a function for each database interaction

//Create and Save a new Ticket
exports.create = (req, res) => {
	  // Validate request
	  if (!req.body.subject) {
	      res.status(400).send({
	            message: "Content can not be empty!",
		    debug: `${req.body.subject}`
	      });
	      return;
	  }

	  // Create a Ticket
	  const ticket = {
	      subject: req.body.subject,
	      severity: req.body.severity,
	      details: req.body.details,
	      user_id: req.body.user_id,
	      status: true
	  };

	  // Save Ticket in the database
	  Ticket.create(ticket)
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Ticket."
	      });
	    });
};

//Retrieve all Tickets from the database or all tickets with user id
exports.findAll = (req, res) => {
	const user_id = req.query.user_id;

	var condition = {
	  [Op.and]: [
	    user_id ? { user_id: { [Op.iLike]: `%${user_id}%` } } : null,
	    { status: true }
	  ]};

	  Ticket.findAll({ where: condition })
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while retrieving tickets."
	      });
	    });
};

//Find a single Ticket with an id
exports.findOne = (req, res) => {
	  const id = req.params.id;

	  Ticket.findByPk(id)
	   .then(data => {
	      if (data) {
	        res.send(data);
	      } else {
	        res.status(404).send({
	          message: `Cannot find Ticket with id=${id}.`
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error retrieving Ticket with id=" + id
	      });
	    });
};

//Update a Ticket by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ticket.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ticket was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ticket with id=" + id
      });
    });
};

//Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
	  
};
