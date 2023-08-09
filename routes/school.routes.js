const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const { schoolCodeCheck,allSchools } = require("../controllers/school.controller");
const {verifyToken}=require('../middlewares/auth.middleware');

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

router.get("/allSchools",verifyToken ,allSchools);

module.exports = router;
