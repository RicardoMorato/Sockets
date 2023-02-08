const dgram = require("dgram");
const { handleConnection } = require("./serverInvoker");

const server = dgram.createSocket("udp4");

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

server.on("error", (err) => {
  console.error(`The server has thrown the following error: ${err}`);
  server.close();
});

server.bind(4000);

handleConnection(server, handleOperation);
