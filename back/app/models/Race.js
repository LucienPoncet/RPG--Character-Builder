const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class Race extends Model {}

Race.init({  
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skill: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Race',
  tableName: 'race',
});

module.exports = Race;