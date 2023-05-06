const db = require("../models");
const Ticket = db.tickets;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  const user_id = req.query.user_id;

	var condition = user_id ? { user_id: { [Op.iLike]: `%${user_id}%` } } : null;

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
