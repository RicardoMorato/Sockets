const { unmarshaller } = require("../../serverUnmarshaller");
const { marshaller } = require("../../serverMarshaller");

const handleConnection = (socket, handleOperation) => {
  socket.on("message", (msg, metadata) => {
    const [operation, ...arguments] = unmarshaller(msg);

    const result = handleOperation(operation, ...arguments);

    socket.send(marshaller(result), metadata.port, metadata.address);
  });
};

module.exports = {
  handleConnection,
};
