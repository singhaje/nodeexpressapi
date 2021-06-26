/** @format */

const express = require("express");
const router = express.Router();

const elasticSearchController = require("../controllers/elasticsearch");

//Handling Get Request to /elasticsearch
router.get("/", elasticSearchController.elastic_get_first);

module.exports = router;
