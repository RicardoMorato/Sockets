const unmarshaller = (rawResult) => {
  const result = Buffer.from(rawResult)[0];

  return result;
};

module.exports = {
  unmarshaller,
};
