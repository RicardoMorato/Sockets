const net = require("net");
const readline = require("readline");

const client = new net.Socket();

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(4000, "127.0.0.1", () => {
  console.log("Conectou");

  readlineInterface.addListener("line", (line) => {
    client.write(line);
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearScreenDown(process.stdout);
  });

  client.on("data", (data) => {
    const receivedMessage = data.toString();

    if (receivedMessage === "end") client.end();

    console.log(`${receivedMessage}\n`);
  });

  client.on("end", () => {
    console.log("Conexão perdida ❌");
  });
});
