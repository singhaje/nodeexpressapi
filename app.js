/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const elasticRoutes = require("./routes/elasticsearch");

// HTTP request logger middleware for node.js
const morgan = require("morgan");

// Require dotenv(to manage secrets and configs)
// Using dotenv package to create environment variables
const dotenv = require("dotenv");
dotenv.config();

// Enable All CORS Requests
var corsOptions = {
    origin: "http://localhost:4200"
    // origin: "*"
  };
  
//app.use(cors(corsOptions));
app.use(cors());

// Log the request
app.use(morgan("dev"));

// Parse incoming data
app.use(express.json());

// Routes which Should handle the requests
app.use("/elasticsearch", elasticRoutes);

// Error Handling
// Handle error if the routes not found or there's any problem in DB connection
app.use((req, res, next) => {
	//Create an error and pass it to the next function
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

// Error Handling
// An error handling middleware
app.use((error, req, res, next) => {
	res.status(error.status || 500).send({
		error: {
			Message: error.message,
		},
	});
});

module.exports = app;
