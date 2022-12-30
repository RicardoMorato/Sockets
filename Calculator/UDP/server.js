const dgram = require("dgram");
const { validateMessageFormat, handleOperation } = require("../utils");

const server = dgram.createSocket("udp4");

server.on("message", (msg, metadata) => {
  console.log(`> ${metadata.address}:${metadata.port}: ${msg} `);

  const { error, errorMessage, numbers, operation } = validateMessageFormat(
    msg.toString()
  );

  if (error)
    server.send(`⚠️⚠️⚠️ ${errorMessage}`, metadata.port, metadata.address);
  else {
    const [number1, number2] = numbers;

    const result = handleOperation(number1, number2, operation);

    server.send(
      `Seu resultado é: ${result}\n`,
      metadata.port,
      metadata.address
    );
  }
});

server.on("error", (err) => {
  console.error(`The server has thrown the following error: ${err}`);
  server.close();
});

server.bind(4000);
