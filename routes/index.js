const router = require("express").Router();
const auth = require("./auth.routes");
const school = require("./school.routes");
const { states, salesReps } = require("../controllers/common.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", (req, res) => {
  res.json({ message: "Server Running" });
});

router.get("/states", verifyToken, states);
router.get("/salesReps", verifyToken, salesReps);

router.use("/auth", auth);
router.use("/school", school);

module.exports = router;
