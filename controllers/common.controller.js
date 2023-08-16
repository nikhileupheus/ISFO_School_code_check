const db = require("../models/index");
const config = require("../config/config");
const logger = require('../helpers/logger');

const states = async (req, res) => {
  try {
    logger.info('common.controller=>states');
    const states = await db.states.findAll({
      attributes: ["id", "state"],
      order: [["state", "ASC"]],
    });
    // let allStates = [];
    // states.map((state) => {
    //   allStates.push({id:state.id,state:state.state});
    // });
    return res
      .status(200)
      .json({ status: "success", message: "All States", data: { states } });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};

const salesReps = async (req, res) => {
  try {
    logger.info('common.controller=>salesReps');
    const salesReps = await db.sales_reps.findAll({
      attributes: ["id", "f_name", "l_name"],
      where:{
        status:1
      }
    });
    return res
      .status(200)
      .json({
        status: "success",
        message: "All Sales Reps",
        data: { salesReps },
      });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};

module.exports = { states, salesReps };
