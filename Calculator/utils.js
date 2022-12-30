const messageFormatWarning =
  "Olá! Esta é uma calculadora super avançada \
  para que a aplicação funcione corretamente, por favor envie sua mensagem no seguinte formato: \
  numero_1:numero_2:operação\nCaso esse formato não seja seguido, você não receberá o resultado esperado.\n";

const includesCorrectOperation = (operation) => {
  const validOperations = ["+", "-", "*", "/"];

  if (!validOperations.includes(operation)) return false;

  return true;
};

const validateMessageFormat = (message) => {
  const splittedMessage = message.split(":");

  if (splittedMessage.length !== 3)
    return {
      numbers: [],
      operation: "",
      error: true,
      errorMessage:
        "Por favor envie sua mensagem no seguinte formato: numero_1:numero_2:operação\n",
    };

  if (isNaN(Number(splittedMessage[0])) || isNaN(Number(splittedMessage[1])))
    return {
      numbers: [],
      operation: "",
      error: true,
      errorMessage: "Por favor envie apenas números inteiros\n",
    };

  if (!includesCorrectOperation(splittedMessage[2]))
    return {
      numbers: [],
      operation: "",
      error: true,
      errorMessage:
        "A calculadora suporta apenas as seguintes operações: '+', '-', '*', '/' \n",
    };

  const [number1, number2, operation] = splittedMessage;

  return {
    numbers: [Number(number1), Number(number2)],
    operation,
    error: false,
    errorMessage: "",
  };
};

const handleOperation = (number1, number2, operation) => {
  let result = 0;

  switch (operation) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    case "/":
      result = number1 / number2;
      break;
    default:
      break;
  }

  return result;
};

module.exports = {
  messageFormatWarning,
  includesCorrectOperation,
  validateMessageFormat,
  handleOperation,
};
