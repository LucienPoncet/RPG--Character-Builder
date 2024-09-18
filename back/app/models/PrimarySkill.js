const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class PrimarySkill extends Model {}

PrimarySkill.init({  
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'PrimarySkill',
  tableName: 'primary_skill',
});

module.exports = PrimarySkill;