const db = require("../models/index");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require('../helpers/logger');

const login = async (req, res) => {
  try {
    logger.info('login.controller=>login');
    const { email, password } = req.body;
    const user = await db.users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect Password" });
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiry,
    });
    user.token = token;
    await user.save();
    user.password=null;
    return res.status(200).json({
      status: "success",
      message: "Login Successfull",
      data: { user },
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Internal Server Error",
        data: { err },
      });
  }
};

module.exports = { login };
