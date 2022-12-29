const net = require("net");
const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleConnection = (socket) => {
  console.log("Conexão recebida ✅");

  socket.on("end", () => {
    console.log("Conexão perdida ❌");
  });

  socket.on("data", (data) => {
    const receivedMessage = data.toString();

    if (receivedMessage === "end") socket.end();

    console.log(`O cliente diz: ${receivedMessage}\n`);
  });

  readlineInterface.addListener("line", (line) => socket.write(line));
};

const server = net.createServer(handleConnection);
server.listen(4000, "127.0.0.1");
