const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define("task", {

  description: {
    type: Sequelize.STRING,
    allowNull: false
  },

  prioritylevel: {
    type: Sequelize.STRING
  },

  completionstatus: {
    type: Sequelize.STRING
  },

  isOpen: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
  //the above function was commented previously

});

module.exports = Task;