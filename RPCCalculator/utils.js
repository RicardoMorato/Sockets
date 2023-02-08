const operationIds = {
  "+": 0,
  "-": 1,
  "*": 2,
  "/": 3,
  end: 4,
};

const reverseOperationIds = {
  0: "+",
  1: "-",
  2: "*",
  3: "/",
  4: "end",
};

const operations = ["-", "+", "*", "/"];

const handleFormatOperation = (message) => {
  let returnValue = {
    errorMessage: null,
    error: null,
    arguments: null,
    operation: null,
  };

  operations.forEach((operation) => {
    if (message.includes(operation)) {
      const splittedMessage = message.split(operation);

      if (splittedMessage.length >= 3)
        return (returnValue = {
          errorMessage: "Too many arguments in the operation",
          error: true,
          arguments: null,
          operation: null,
        });

      returnValue.arguments = splittedMessage.map((m) => m.trim());
      returnValue.operation = operation;
    }
  });

  return returnValue;
};

module.exports = {
  operationIds,
  reverseOperationIds,
  handleFormatOperation,
};
