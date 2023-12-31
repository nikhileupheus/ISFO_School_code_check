const sequelize = require("../config/db.config");
const db = {};
const initModel = require("./init-models");
const model = initModel(sequelize);

db.users = model.users;
db.user_sessions = model.user_sessions;
db.school_codes = model.school_codes;
db.states = model.states;
db.sales_reps = model.sales_reps;
db.school_contacts = model.school_contacts;
db.school_address = model.school_address;

module.exports = db;
