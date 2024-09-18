const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class Class extends Model {}

Class.init({  
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Class',
  tableName: 'class',
});

module.exports = Class;