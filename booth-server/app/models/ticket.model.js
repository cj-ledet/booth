module.exports = (sequelize, Sequelize) => {
	  const Ticket = sequelize.define("ticket", {
		      subject: {
			            type: Sequelize.STRING
			          },
		      severity: {
			            type: Sequelize.STRING
			          },
		      details: {
			            type: Sequelize.STRING
		                  },
		      notes: {
			            type: Sequelize.ARRAY(Sequelize.STRING)
			          },
		      user_id: {
			      	    type: Sequelize.STRING
		      	   	  },
		      status: { //True = open & False = closed
			            type: Sequelize.BOOLEAN
			          }
		    });

	  return Ticket;
};
