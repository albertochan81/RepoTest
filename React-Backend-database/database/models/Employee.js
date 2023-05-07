const Sequelize = require('sequelize');
const db = require('../db');

const Employee = db.define("employee", {

  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  department: {
    type: Sequelize.STRING,
  },

});

module.exports = Employee;