/**
 * 建立角色表模型
 */

const { DataTypes } = require('sequelize')
const dbServer = require('../database/index')

const Role = dbServer.sequelize.define('roles', {
  objId: {
    type: DataTypes.STRING,
    field: 'objId',
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    field: 'type'
  }
})

module.exports = Role