const { operationIds } = require("../../utils");

const marshaller = (operation, arguments) => {
  const array = new Uint16Array(3);

  array[0] = operationIds[operation];
  array[1] = arguments[0];
  array[2] = arguments[1];

  return Buffer.from(array);
};

module.exports = {
  marshaller,
};
