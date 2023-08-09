const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const { login } = require("../controllers/login.controller");

router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

module.exports = router;
