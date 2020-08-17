const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  } else if (err.status === 400) {
    return res.status(400).json({ message: err.message });
  } else {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = errorHandler;
