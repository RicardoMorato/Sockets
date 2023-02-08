const readline = require("readline");
const dgram = require("dgram");

const { handleFormatOperation } = require("../../utils");
const { unmarshaller } = require("../../clientUnmarshaller");
const { handleConnection } = require("./clientInvoker");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = dgram.createSocket("udp4");

client.connect(4000, "localhost", () => {
  readlineInterface.addListener("line", (line) => {
    const { error, errorMessage, operation, arguments } =
      handleFormatOperation(line);

    if (error) console.log(errorMessage);
    else handleConnection(client, operation, arguments);
  });
});

client.on("error", (err) => {
  console.error(`The client has thrown the following error: ${err}`);
  client.close();
});

client.on("message", (msg) => {
  const result = unmarshaller(msg);
  console.log(`🤖: ${result}`);
});
