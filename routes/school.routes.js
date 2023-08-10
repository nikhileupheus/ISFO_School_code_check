const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const {
  schoolCodeCheck,
  allSchools,
  createSchool,
} = require("../controllers/school.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post(
  "/schoolCodeCheck",
  celebrate({
    body: Joi.object().keys({
      schoolCode: Joi.string().required(),
    }),
  }),
  verifyToken,
  schoolCodeCheck
);

router.get("/allSchools", verifyToken, allSchools);

router.post(
  "/create",
  celebrate({
    body: Joi.object().keys({
      schoolCode: Joi.string().required().length(5),
      amount: Joi.number().required(),
      schoolName: Joi.string().required().min(5),
      schoolEmail: Joi.string().email().required(),
      schoolPhone: Joi.string().regex(/^[0-9]{10}$/).required(),
      schoolAddress: Joi.string().required().min(5),
      city: Joi.string().required(),
      stateId: Joi.number().required(),
      pincode: Joi.string().required().length(6),
      coordinatorName: Joi.string().required().min(2),
      salesRepId: Joi.number().required(),
    }),
  }),
  verifyToken,
  createSchool
);

module.exports = router;
