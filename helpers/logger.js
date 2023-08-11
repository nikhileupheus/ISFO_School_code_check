const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, printf } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const transport = new winston.transports.DailyRotateFile({
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
  dirname: "./logs/",
});

transport.on("rotate", function (oldFilename, newFilename) {
  // do something fun
});

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const format = combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat);

const transports = [transport, new winston.transports.Console()];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger;
