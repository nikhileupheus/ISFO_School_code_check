const jwt = require("jsonwebtoken");
const config=require('../config/config');

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

module.exports={verifyToken};