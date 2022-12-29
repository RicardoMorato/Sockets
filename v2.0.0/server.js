const net = require("net");
const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let clients = [];

const broadcastToClients = (message, sender) => {
  const normalizedMessage = `${sender.name}: ${message}`;

  clients.forEach((client) => {
    if (client !== sender) client.write(normalizedMessage);
  });

  console.log(normalizedMessage);
};

const handleConnection = (socket) => {
  socket.name = socket.remoteAddress + ":" + socket.remotePort;

  clients.push(socket);

  console.log(`Conexão recebida, ${socket.name} conectado ✅\n`);

  socket.write(
    `Esta é uma mensagem privada, só você pode vê-la.\nPor favor, informe seu nome com a seguinte mensagem: "${socket.remoteAddress}:${socket.remotePort}: seu-nome-aqui"\n`
  );

  socket.on("end", () => {
    clients = clients.filter((client) => client !== socket);
    console.log(`Conexão perdida, ${socket.name} desconectado ❌\n`);
  });

  socket.on("data", (data) => {
    const receivedMessage = data.toString();

    const primaryClientId = `${socket.remoteAddress}:${socket.remotePort}`;

    if (receivedMessage.includes(`${primaryClientId}:`)) {
      const socketName = receivedMessage
        .split(`${primaryClientId}:`)
        .join("")
        .trim();

      clients.forEach((client) => {
        if (client.name === primaryClientId) client.name = socketName;
      });

      socket.write(
        `Olá! ${socketName}, fique a vontade para conversar com os outros clients no chat!\n`
      );
    } else if (socket.name.includes("127.0.0.1")) {
      socket.write(
        `Esta é uma mensagem privada, só você pode vê-la.\nPor favor, informe seu nome com a seguinte mensagem: "${socket.remoteAddress}:${socket.remotePort}: seu-nome-aqui"\n`
      );
    } else {
      broadcastToClients(receivedMessage, socket);
    }
  });

  readlineInterface.addListener("line", (line) => socket.write(line));
};

const server = net.createServer(handleConnection);
server.listen(4000, "127.0.0.1");
