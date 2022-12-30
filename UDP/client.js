const readline = require("readline");
const dgram = require("dgram");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = dgram.createSocket("udp4");

readlineInterface.addListener("line", (line) => client.send(line, 4000, 'localhost'));

client.on("error", (err) => {
  console.error(`The client has thrown the following error: ${err}`);
  client.close();
});

client.on('message', (msg) => console.log(`🤖: ${msg}`))

client.bind(4001)