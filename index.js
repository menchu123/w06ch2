require("dotenv").config();
const http = require("http");
const operation = require("./operation");

const server = http.createServer();

const port = process.env.SERVER_CALCULATOR_TERMINATOR || 5000;

server.listen(port);

server.on("request", (request, response) => {
  const getParams = new URL(request.url, `htpp://${request.headers.host}`);
  const values = getParams.searchParams.values();

  const params = [];
  for (const value of values) {
    params.push(+value);
  }
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  response.write("<h1>Hola Peix</h1>");

  // response.setHeader("Content-Type", "application/json");
  response.end();
});
