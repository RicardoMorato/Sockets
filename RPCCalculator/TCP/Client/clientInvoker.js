const { marshaller } = require("../../clientMarshaller");

const handleConnection = (socket, operation, arguments) => {
  const message = marshaller(operation, arguments);

  socket.write(message);
};

module.exports = {
  handleConnection,
};
