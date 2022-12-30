const net = require("net");
const {
  messageFormatWarning,
  validateMessageFormat,
  handleOperation,
} = require("../utils");

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
