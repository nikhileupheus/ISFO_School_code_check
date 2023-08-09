var DataTypes = require("sequelize").DataTypes;
var _isfo_booklets = require("./isfo_booklets");
var _isfo_contact = require("./isfo_contact");
var _migrations = require("./migrations");
var _otps = require("./otps");
var _personal_access_tokens = require("./personal_access_tokens");
var _sales_reps = require("./sales_reps");
var _school_address = require("./school_address");
var _school_codes = require("./school_codes");
var _school_contacts = require("./school_contacts");
var _states = require("./states");
var _student_master = require("./student_master");
var _student_payment = require("./student_payment");
var _student_subject = require("./student_subject");
var _users = require("./users");

function initModels(sequelize) {
  var isfo_booklets = _isfo_booklets(sequelize, DataTypes);
  var isfo_contact = _isfo_contact(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var otps = _otps(sequelize, DataTypes);
  var personal_access_tokens = _personal_access_tokens(sequelize, DataTypes);
  var sales_reps = _sales_reps(sequelize, DataTypes);
  var school_address = _school_address(sequelize, DataTypes);
  var school_codes = _school_codes(sequelize, DataTypes);
  var school_contacts = _school_contacts(sequelize, DataTypes);
  var states = _states(sequelize, DataTypes);
  var student_master = _student_master(sequelize, DataTypes);
  var student_payment = _student_payment(sequelize, DataTypes);
  var student_subject = _student_subject(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  student_subject.belongsTo(student_master, { as: "fk_student", foreignKey: "fk_student_id"});
  student_master.hasMany(student_subject, { as: "student_subjects", foreignKey: "fk_student_id"});

  return {
    isfo_booklets,
    isfo_contact,
    migrations,
    otps,
    personal_access_tokens,
    sales_reps,
    school_address,
    school_codes,
    school_contacts,
    states,
    student_master,
    student_payment,
    student_subject,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
