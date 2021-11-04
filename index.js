require("dotenv").config();
const http = require("http");
const { program } = require("commander");
const operation = require("./operation");
const isValid = require("./isValid");

program.option("-p, --port <port>");
program.parse(process.argv);

const server = http.createServer();

let port;
if (program.opts().port && !Number.isNaN(program.opts().port)) {
  port = program.opts().port;
} else {
  port = process.env.SERVER_CALCULATOR_TERMINATOR || 5000;
}

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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora 🐟</title>
</head>
<body style="font-family:monospace;padding:40px">
  <h1>Calculadora 🐟</h1>
  <div style="padding-inline-start:40px;font-size:18px">Resultados:</div>
  <ul style="list-style-type:none;font-size:18px">
    <li>${num1} + ${num2} = ${sum}</li>
    <li>${num1} - ${num2} = ${substraction}</li>
    <li>${num1} * ${num2} = ${multiplication}</li>
    <li>${num1} / ${num2} = ${division}</li>
  </ul>
</body>
</html>`;

const generateErrorHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=, initial-scale=1.0">
  <title>Calculadora 🐟</title>
</head>
<body style="font-family:monospace;padding:40px;color:red">
  <h1>404 ERROR!!!!!</h1>
</body>
</html>`;

server.on("request", (request, response) => {
  const getParams = new URL(request.url, `htpp://${request.headers.host}`);
  const values = getParams.searchParams.values();

  const params = [];
  for (const value of values) {
    params.push(+value);
  }

  response.setHeader("Content-Type", "text/html");

  response.statusCode = getParams.pathname !== "/calculator" ? 404 : 200;

  response.setHeader("Content-type", "text/html");
  response.write(
    !isValid(params) || getParams.pathname !== "/calculator"
      ? generateErrorHTML()
      : generateHTML(operation(params[0], params[1]))
  );

  response.end();
});
