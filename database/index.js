/**
 * 连接数据库
 * 具体参数含义详情见Sequelize中文文档：https://www.sequelize.cn/
* */
const { Sequelize } = require('sequelize')
const dbServer = {}

const sequelize = new Sequelize('pvpgames', 'root', 'cz408496', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: { max: 5, min: 0, acquire: 30000, idle: 1000 }
})

dbServer.sequelize = sequelize
dbServer.Sequelize = Sequelize

module.exports = dbServer