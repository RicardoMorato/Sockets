const readline = require("readline");
const dgram = require("dgram");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const server = dgram.createSocket("udp4");

server.on("message", (msg, metadata) => {
  console.log(`> ${metadata.address}:${metadata.port}: ${msg} `);
});

readlineInterface.addListener("line", (line) =>
  server.send(line, 4001, 'localhost')
);

server.on("error", (err) => {
  console.error(`The server has thrown the following error: ${err}`);
  server.close();
});

server.bind(4000);
