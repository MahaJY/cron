const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const userdetails = sequelize.define('user2', {
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  email: {
    type: DataTypes.STRING,
  },

}, {
  timestamps: false,
    tableName:'user2',
});


module.exports = userdetails;