const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs.txt");

function loggers(req, res, next) {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile(logFile, log, (err) => {
    if (err) console.error("Error al registrar log:", err);
  });
  next();
}

module.exports = loggers;
