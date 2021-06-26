/** @format */

const http = require("http");

const PORT = process.env.PORT || 4200;

const app = require("./app");

// Create Server
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
