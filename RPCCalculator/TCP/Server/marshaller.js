const marshaller = (result) => {
  const resultArray = new Uint16Array(1);
  resultArray[0] = result;

  return Buffer.from(resultArray);
};

module.exports = {
  marshaller,
};
