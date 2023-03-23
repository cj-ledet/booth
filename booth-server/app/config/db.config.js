module.exports = {
	  HOST: "localhost",
	  USER: "tickets",
	  PASSWORD: "Testing123!",
	  DB: "tickets",
	  dialect: "postgres",
	  pool: {
		      max: 5,
		      min: 0,
		      acquire: 30000,
		      idle: 10000
		    }
};
