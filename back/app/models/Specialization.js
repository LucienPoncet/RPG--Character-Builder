const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class Specialization extends Model {}

Specialization.init({  
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Specialization',
  tableName: 'specialization',
});

module.exports = Specialization;