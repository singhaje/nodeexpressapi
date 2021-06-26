/** @format */
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200',
auth: {
  username: 'elastic',
  password:'123455'
} });

exports.elastic_get_first = async(req, res, next) => {
	//Search Criteria
	await client.search({
		index: "inc_exec",
		from: 0,
		size: 30,
		body: {
		  query: {
			"terms":{
			  "result.u_final_severity.display_value.keyword": ["Severity 1", "Severity 2"]
			}      
		  }
		}		
	  })
	  .then(res => {
		res.status(200).send({
			result: {res},
			message: "Successful Found",
		});
	  })
	  .catch((error) => {
		res.status(404).send({
			message: "Not found111",
			error: error,
		});
	});  
};

	