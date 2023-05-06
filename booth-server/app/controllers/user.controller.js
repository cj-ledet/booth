const db = require("../models");
const Ticket = db.tickets;
const User = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  User.findAll()
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

//Find a single User with an id
exports.adminBoardGetUser = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
   .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
	  
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities
        });
      });
    })
    .then
    .catch(err => {
      res.status(500).send({
	message: "Error retrieving User with id=" + id
      });
    });
};

//Update a User by the id in the request
exports.adminBoardUpdateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
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
