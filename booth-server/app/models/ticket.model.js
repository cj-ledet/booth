module.exports = (sequelize, Sequelize) => {
	  const Ticket = sequelize.define("ticket", {
		      subject: {
			            type: Sequelize.STRING
			          },
		      severity: {
			            type: Sequelize.STRING
			          },
		      user_id: {
			      	    type: Sequelize.STRING
		      	   	  }
		    });

	  return Ticket;
};
