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
  userObjId: {
    type: DataTypes.STRING,
    field: 'userObjId'
  },
  name: {
    type: DataTypes.STRING,
    field: 'name'
  },
  permission: {
    type: DataTypes.STRING,
    field: 'permission'
  },
  createAt: {
    type: DataTypes.DATE,
    field: 'createAt'
  },
},{ tableName: 'roles',timestamps: false })

module.exports = Role