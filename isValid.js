const isValid = (array) => {
  if (
    array.length !== 2 ||
    Number.isNaN(+array[0]) ||
    Number.isNaN(+array[1])
  ) {
    return false;
  }
  return true;
};

module.exports = isValid;
