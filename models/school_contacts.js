const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('school_contacts', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    school_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    person_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    person_email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    person_phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    send_email: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'school_contacts',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
