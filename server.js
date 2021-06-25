const cors = require("cors");
const Promise = require('Promise');
const express = require("express");
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200',
auth: {
  username: 'elastic',
  password:'123455'
} });


const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
  // origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/elasticsearch", asyncWrapper(getElasticData));
  
app.post('/elasticsearch', asyncWrapper(getElasticData) );

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function asyncWrapper(fn) {
  return (req, res, next) => {
    return Promise.resolve(fn(req))
      .then((result) => res.send(result))
      .catch((err) => next(err))
  }
};

async function getElasticData(req) {
  const body = await client.search({
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
    
  });
  return body;
};