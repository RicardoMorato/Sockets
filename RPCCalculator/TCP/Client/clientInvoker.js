const { marshaller } = require("./marshaller");
const { unmarshaller } = require("./unmarshaller");

const handleConnection = (socket, operation, arguments) => {
  const message = marshaller(operation, arguments);

  socket.write(message);
};

module.exports = {
  handleConnection,
};
