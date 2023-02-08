const net = require("net");

const readline = require("readline");
const { handleFormatOperation } = require("../../utils");
const { handleConnection } = require("./clientInvoker");
const { unmarshaller } = require("./unmarshaller");

const client = new net.Socket();

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.connect(4000, "127.0.0.1", () => {
  console.log("Conexão iniciada ✅\n");

  readlineInterface.addListener("line", (line) => {
    const { error, errorMessage, operation, arguments } =
      handleFormatOperation(line);

    if (error) console.log(errorMessage);
    else handleConnection(client, operation, arguments);
  });

  client.on("data", (data) => {
    const receivedResult = unmarshaller(data);

    console.log(`A calculadora diz: ${receivedResult}\n`);
  });
});
