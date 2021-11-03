require("dotenv").config();
const http = require("http");
const operation = require("./operation");
const isValid = require("./isValid");

const server = http.createServer();

const port = process.env.SERVER_CALCULATOR_TERMINATOR || 5000;

server.listen(port);

const generateHTML = ({
  num1,
  num2,
  sum,
  substraction,
  multiplication,
  division,
}) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=, initial-scale=1.0">
  <title>Calculadora 🐟</title>
</head>
<body>
  <h1>Calculadora 🐟</h1>
  <div>Resultados:</div>
  <ul>
    <li>${num1} + ${num2} = ${sum}</li>
    <li>${num1} - ${num2} = ${substraction}</li>
    <li>${num1} * ${num2} = ${multiplication}</li>
    <li>${num1} / ${num2} = ${division}</li>
  </ul>
</body>
</html>`;

server.on("request", (request, response) => {
  const getParams = new URL(request.url, `htpp://${request.headers.host}`);
  const values = getParams.searchParams.values();

  const params = [];
  for (const value of values) {
    params.push(+value);
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  response.write(generateHTML(operation(params[0], params[1])));
  response.end();
});
