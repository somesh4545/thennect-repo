const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({ error: err });
};

module.exports = errorHandlerMiddleware;
