const operation = (num1, num2) => {
  const sum = num1 + num2;
  const substraction = num1 - num2;
  const multiplication = num1 * num2;
  const division = num1 / num2;

  return {
    num1,
    num2,
    sum,
    substraction,
    multiplication,
    division,
  };
};

module.exports = operation;
