/**
 * 建立字典数据表模型
 */


const { DataTypes } = require('sequelize')
const dbServer = require('../database/index')

const Dict = dbServer.sequelize.define('dicts', {
  objId: {
    type: DataTypes.STRING,
    field: 'objId',
    allowNull: false,
    primaryKey: true,
  },
  codeValue: {
    type: DataTypes.STRING,
    field: 'codeValue',
  },
  value: {
    type: DataTypes.STRING,
    field: 'value',
  },
  type: {
    type: DataTypes.STRING,
    field: 'type',
  },
}, { tableName: 'dicts',timestamps: false })

module.exports = Dict