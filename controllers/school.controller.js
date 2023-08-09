const db = require("../models/index");
const config = require("../config/config");

const schoolCodeCheck = async (req, res) => {
  try {
    const { schoolCode } = req.body;
    const isExisting = await db.school_codes.count({
      where: {
        school_code: schoolCode,
      },
    });
    if (isExisting !== 0) {
      return res.status(401).json({
        status: "error",
        message: "School code already exists",
      });
    }
    return res
      .status(200)
      .json({ status: "success", message: "School code is valid" });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};

const createSchool = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};
const allSchools = async (req, res) => {
  try {
    const allSchools = await db.school_codes.findAll({
        attributes:['id','amount','school_name','school_code'],
        order:[['id','ASC']],
    });
    return res.status(200).json({status:'success',message:'All Schools',data:{allSchools}});
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};

module.exports = { schoolCodeCheck, createSchool, allSchools };
