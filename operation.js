const operation = (num1, num2) => {
  const sum = num1 + num2;
  const substraction = num1 - num2;
  const multiplication = num1 * num2;
  const division = num1 / num2;

  return `Resultados:
  ${num1} + ${num2} = ${sum}
  ${num1} - ${num2} = ${substraction}
  ${num1} * ${num2} = ${multiplication}
  ${num1} / ${num2} = ${division}`;
};

module.exports = operation;
