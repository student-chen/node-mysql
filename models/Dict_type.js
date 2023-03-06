/**
 * 建立字典类型表模型
 */

const { DataTypes } = require('sequelize')
const dbServer = require('../database/index')

const DictType = dbServer.sequelize.define('dict_type', {
  objId: {
    type: DataTypes.STRING,
    field: 'objId',
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    field: 'type',
    allowNull: false,
  },
}, {tableName: 'dict_type',timestamps: false})

module.exports = DictType