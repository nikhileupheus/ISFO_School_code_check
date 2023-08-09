const router = require("express").Router();
const auth= require("./auth.routes");
const school= require('./school.routes');

router.get('/', (req, res) => {
    res.json({ message: "Server Running" });
});

router.use('/auth',auth);
router.use('/school',school);

module.exports = router;