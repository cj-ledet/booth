module.exports = app => {
	  const tickets = require("../controllers/ticket.controller.js");

	  var router = require("express").Router();

	  // Create a new Ticket
	  router.post("/", tickets.create);

	  // Retrieve all Tickets (or user ID specified tickets)
	  router.get("/", tickets.findAll);

	  // Retrieve a single Ticket with id
	  router.get("/:id", tickets.findOne);
	
	  //Update a Ticket based on ID
	  router.put("/:id", tickets.update);

	  app.use('/api/tickets', router);
};
