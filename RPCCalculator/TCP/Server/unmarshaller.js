const { reverseOperationIds } = require("../../utils");

const unmarshaller = (binaryArray) => {
  const [operation, firstNumber, secondNumber] = Buffer.from(binaryArray);

  return [reverseOperationIds[operation], firstNumber, secondNumber];
};

module.exports = {
  unmarshaller,
};
