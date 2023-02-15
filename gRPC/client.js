const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const calculatorPackage = grpcObject.calculatorPackage;

const client = new calculatorPackage.Calculator(
  "0.0.0.0:4000",
  grpc.credentials.createInsecure()
);

const func = process.argv[2];
const firstNumber = Number(process.argv[3]);
const secondNumber = Number(process.argv[4]);

switch (func) {
  case "add":
    client.add(
      {
        firstNumber,
        secondNumber,
      },
      handleResult
    );
    break;

  case "sub":
    client.sub(
      {
        firstNumber,
        secondNumber,
      },
      handleResult
    );
    break;

  case "mult":
    client.mult(
      {
        firstNumber,
        secondNumber,
      },
      handleResult
    );
    break;

  case "divide":
    client.divide(
      {
        firstNumber,
        secondNumber,
      },
      handleResult
    );
    break;

  default:
    warnMessageFormat();
    break;
}

function handleResult(err, response) {
  if (err) {
    console.error(err);
    return;
  }

  const { result } = response;
  console.log("A resposta é: " + result);
}

function warnMessageFormat() {
  console.log(
    "Por favor, utilize o seguinte padrão para que a aplicacao funcione corretamente:\n"
  );
  console.log("node client.js <func> <firstNumber> <secondNumber>\n");
  console.log(
    "Em que <func> pode ser uma das seguintes opcoes:\nadd\nsub\nmult\ndivide\n"
  );
  console.log(
    "E <firstNumber> e <secondNumber> são números inteiros (números com ponto flutuante serão arredondados)\n\n"
  );
}
