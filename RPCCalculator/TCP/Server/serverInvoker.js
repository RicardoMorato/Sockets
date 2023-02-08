const { unmarshaller } = require("./unmarshaller");
const { marshaller } = require("./marshaller");

const handleConnection = (socket, handleOperation) => {
  const socketName = socket.remoteAddress + ":" + socket.remotePort;

  socket.on("data", (data) => {
    const [operation, ...arguments] = unmarshaller(data);

    if (operation === 4) socket.end();

    const result = handleOperation(operation, ...arguments);

    console.log(
      `${socketName}: ${arguments[0]} ${operation} ${arguments[1]} = ${result}\n`
    );

    const binaryResult = marshaller(result);

    socket.write(binaryResult);
  });

  socket.on("end", () => {
    console.log("Conexão perdida ❌\n");
  });
};

module.exports = {
  handleConnection,
};
