const db = require("../models/index");
const config = require("../config/config");

const states = async (req, res) => {
  try {
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
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};

const salesReps = async (req, res) => {
  try {
    const salesReps = await db.sales_reps.findAll({
      attributes: ["id", "f_name", "l_name"],
    });
    return res
      .status(200)
      .json({
        status: "success",
        message: "All Sales Reps",
        data: { salesReps },
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};

module.exports = { states, salesReps };
