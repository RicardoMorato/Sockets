const net = require("net");

const { handleConnection } = require("./serverInvoker");

const handleOperation = (operation, firstArg, secondArg) => {
  let result = 0;
  switch (operation) {
    case "+":
      result = firstArg + secondArg;
      break;
    case "-":
      result = firstArg - secondArg;
      break;
    case "*":
      result = firstArg * secondArg;
      break;
    case "/":
      result = firstArg / secondArg;
      break;
  }

  return result;
};

const startServer = (socket) => {
  handleConnection(socket, handleOperation);
};

const server = net.createServer(startServer);
server.listen(4000, "127.0.0.1");
