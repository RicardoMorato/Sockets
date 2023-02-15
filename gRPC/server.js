const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const calculatorPackage = grpcObject.calculatorPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:4000", grpc.ServerCredentials.createInsecure());
server.addService(calculatorPackage.Calculator.service, {
  add,
  sub,
  mult,
  divide,
});
server.start();

function add(call, callback) {
  const { firstNumber, secondNumber } = call.request;

  const result = firstNumber + secondNumber;

  callback(null, { result });
}

function sub(call, callback) {
  const { firstNumber, secondNumber } = call.request;

  const result = firstNumber - secondNumber;

  callback(null, { result });
}

function mult(call, callback) {
  const { firstNumber, secondNumber } = call.request;

  const result = firstNumber * secondNumber;

  callback(null, { result });
}

function divide(call, callback) {
  const { firstNumber, secondNumber } = call.request;

  const result = firstNumber / secondNumber;

  callback(null, { result });
}
