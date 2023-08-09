const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('school_codes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    crm_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    school_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    school_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "school_codes_UN"
    },
    city_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    state_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    sales_rep_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    log: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'school_codes',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "school_codes_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "school_code" },
        ]
      },
      {
        name: "school_codes_state_id_foreign",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
      {
        name: "school_codes_sales_rep_id_foreign",
        using: "BTREE",
        fields: [
          { name: "sales_rep_id" },
        ]
      },
    ]
  });
};
