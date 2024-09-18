const { Model, DataTypes } = require('sequelize');

const sequelize = require ('./sequelize');

class Magic extends Model {}

Magic.init({  
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Magic',
  tableName: 'magic',
});

module.exports = Magic;