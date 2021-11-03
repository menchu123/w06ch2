require("dotenv").config();
const http = require("http");

const server = http.createServer();

const port = process.env.SERVER_CALCULATOR_TERMINATOR || 5000;

server.listen(port);
