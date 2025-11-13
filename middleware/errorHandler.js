function errorHandler(err, req, res, next) {
  console.error("Error capturado:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
  });
}

module.exports = errorHandler;
