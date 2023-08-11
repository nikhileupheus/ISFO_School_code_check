const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors } = require("celebrate");
const config = require("./config/config");
const router = require("./routes");
const logger= require('./helpers/logger');
const app = express();
const db = require("./config/db.config");
var corsOptions = {
  origin: "*",
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server Running" });
});

app.use("/api", router);

app.use(function (req, res, next) {
  let error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use(errors());

app.listen(config.port, () => {
  logger.info(`Server listening at port ${config.port}`);
});
