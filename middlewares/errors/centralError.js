const CentralError = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: err.message });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
};

module.exports = CentralError;
