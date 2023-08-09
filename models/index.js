const sequelize = require('../config/db.config');
const db = {};
const initModel = require('./init-models');
const model = initModel(sequelize);

db.users= model.users;
db.user_sessions= model.user_sessions;
db.school_codes= model.school_codes;


module.exports=db;