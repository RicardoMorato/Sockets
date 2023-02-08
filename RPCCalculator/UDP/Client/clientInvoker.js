const { marshaller } = require("../../clientMarshaller");

const handleConnection = (socket, operation, arguments) => {
  const message = marshaller(operation, arguments);

  socket.send(message, 4000, "localhost");
};

module.exports = {
  handleConnection,
};
