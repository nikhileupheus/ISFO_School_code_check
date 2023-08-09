const jwt = require("jsonwebtoken");
const config=require('../config/config');
const db= require('../models/index');

const verifyToken = async(req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, config.jwtSecret, async(err, user) => {
            if (err) return res.status(403).json("Token is not valid!");
            const validToken= await db.users.findOne({
                where:{
                    id:user.id
                },
                attributes:['token']
            });
            if(validToken.token!==token) return res.status(403).json("Token is not valid!");
            req.userId = user.id;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

module.exports={verifyToken};