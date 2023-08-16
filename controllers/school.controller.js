const db = require("../models/index");
const config = require("../config/config");
const sequelize = require("../config/db.config");
const logger = require('../helpers/logger');

const schoolCodeCheck = async (req, res) => {
  try {
    logger.info('school.controller=>schoolCodeCheck');
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
    logger.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};

const createSchool = async (req, res) => {
  try {
    logger.info('school.controller=>createSchool');
    const {
      schoolCode,
      amount,
      schoolName,
      schoolEmail,
      schoolPhone,
      schoolAddress,
      city,
      stateId,
      pincode,
      coordinatorName,
      salesRepId,
    } = req.body;
    const isExisting = await db.school_codes.count({
      where: {
        school_code: schoolCode,
      },
    });
    if (isExisting !== 0) {
      return res.status(409).json({
        status: "error",
        message: "School code already exists",
      });
    }
    const isExistingSchool = await db.school_codes.findOne({
      where: {
        school_name: schoolName,
        city_name: city,
        state_id:stateId
      },
    });
    if (isExistingSchool) {
      return res.status(409).json({
        status: "error",
        message: `School already exists with code ${isExistingSchool.school_code}`,
      });
    }
    await sequelize.transaction(async (transactionInstance) => {
      await db.school_codes.create(
        {
          amount: amount,
          school_name: schoolName,
          school_code: schoolCode,
          city_name: city,
          state_id: stateId,
          sales_rep_id: salesRepId,
          status: true,
        },
        { transaction: transactionInstance }
      );
      await db.school_address.create(
        {
          school_code: schoolCode,
          state_code: stateId,
          city,
          pin: pincode,
          address: schoolAddress,
        },
        { transaction: transactionInstance }
      );
      await db.school_contacts.create(
        {
          school_code: schoolCode,
          person_name: coordinatorName,
          person_email: schoolEmail,
          person_phone: schoolPhone,
          send_email: 1,
        },
        { transaction: transactionInstance }
      );
    });
    return res
      .status(200)
      .json({ status: "success", message: "School created successfully" });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: { err },
    });
  }
};
const allSchools = async (req, res) => {
  try {
    logger.info('school.controller=>allSchools');
    const allSchools = await db.school_codes.findAll({
      attributes: ["id", "amount", "school_name", "school_code"],
      order: [["id", "ASC"]],
    });
    return res.status(200).json({
      status: "success",
      message: "All Schools",
      data: { allSchools },
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

module.exports = { schoolCodeCheck, createSchool, allSchools };
