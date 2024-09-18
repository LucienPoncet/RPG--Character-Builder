const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class PrimaryStatistic extends Model {}

PrimaryStatistic.init({  
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
  modelName: 'PrimaryStatistic',
  tableName: 'primary_statistic',
});

module.exports = PrimaryStatistic;