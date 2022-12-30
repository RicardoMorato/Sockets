const net = require("net");

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

const handleConnection = (socket) => {
  console.log("Conexão recebida ✅\n");

  const socketName = socket.remoteAddress + ":" + socket.remotePort;

  socket.write(messageFormatWarning);

  socket.on("end", () => {
    console.log("Conexão perdida ❌\n");
  });

  socket.on("data", (data) => {
    const receivedMessage = data.toString();

    if (receivedMessage === "end") socket.end();

    console.log(`${socketName}: ${receivedMessage}\n`);

    const { error, errorMessage, numbers, operation } =
      validateMessageFormat(receivedMessage);

    if (error) socket.write(`⚠️⚠️⚠️ ${errorMessage}`);
    else {
      const [number1, number2] = numbers;

      const result = handleOperation(number1, number2, operation);

      socket.write(`Seu resultado é: ${result}\n`);
    }
  });
};

const server = net.createServer(handleConnection);
server.listen(4000, "127.0.0.1");
