const db = require("../models");
const Ticket = db.tickets;
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  User.findAll({ attributes: { exclude: ['password'] } })
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
          authorities.push(roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities
        });
      });
    })
    .catch(err => {
      res.status(500).send({
	message: "Error retrieving User with id=" + id
      });
    });
};

//Update a User by the id in the request
exports.adminBoardUpdateUser = (req, res) => {
  const id = req.params.id;	 
  const roles = req.body.roles;
	
  if (roles[0] == "addMod" || roles[0] == "removeMod" || roles[0] == "addAdmin" || roles[0] == "removeAdmin") {
    console.log("\nRoles Reached\n"); 
    const role = 0;
    const output = "";
    const add = false;
    switch(roles[0]) {
      case "addMod":
        role = 2;
	output = "Moderator";
        add = true;
        break;
      case "removeMod":
        role = 2;
	output = "Moderator";
	add = false;
        break;
      case "addAdmin":
	role = 3;
	output = "Admin";
	add = true;
	break;
      case "removeAdmin":
	role = 3;
	output = "Admin";
	add = false;
	break;
      default:
	res.send({ message: "Error with Role Change!"});
    }
  
    if (add) { 
      console.log("\nReached Add\n");  
      Role.findByPk(role)
      .then(roleResult => {
        User.findByPk(id)
	.then(user => {
	  user.addRole(roleResult)
	    .then(response => {
            if (!response) {
	      res.send({
	        message: `${output} permissions successfully added to this user!`
	      });
            } else {
	      res.send({
	        message: `Cannot update permissions for User with id=${id}. Maybe User was not found!`
	      });
            }
          })
          .catch(err => {
            res.status(500).send({
	      message: "Error updating permissions for User with id=" + id
            });
          });
	})
      })
    } else {
      console.log("\nReached Remove\n");
      Role.findByPk(role)
      .then(roleResult => {
        User.findByPk(id)
	.then(user => {
	  user.removeRole(roleResult)
	    .then(response => {
            if (!response) {
	      res.send({
	        message: `${output} permissions successfully added to this user!`
	      });
            } else {
	      res.send({
	        message: `Cannot update permissions for User with id=${id}. Maybe User was not found!`
	      });
            }
          })
          .catch(err => {
            res.status(500).send({
	      message: "Error updating permissions for User with id=" + id
            });
          });
	})
      })	    
     }
    }
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
