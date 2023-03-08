/**
 * 建立用户表模型
 */
const { DataTypes } = require('sequelize')
const dbServer = require('../database/index')

const User = dbServer.sequelize.define('users', {
    objId: {
        type: DataTypes.STRING,
        field: 'objId',
        allowNull: false,
        primaryKey: true,
    },
    // 前端校验账号密码不能为空
    account: {
        type: DataTypes.STRING,
        field: 'account',
    },
    permission: {
        type: DataTypes.INTEGER,
        field: 'permission',
        allowNull: false,
        defaultValue: 0, // 0: 普通用户, 1: 管理员
    },
    password: {
        type: DataTypes.STRING,
        field: 'password',
    },
    user_name: {
        type: DataTypes.STRING,
        field: 'user_name',
    },
    avatar: {
        type: DataTypes.STRING,
        field: 'avatar',
    },
    email: {
        type: DataTypes.STRING,
        field: 'email',
    },
    sex: {
        type: DataTypes.STRING,
        field: 'sex',
    },
    age: {
        type: DataTypes.STRING,
        field: 'age',
    },
    birthDay: {
        type: DataTypes.STRING,
        field: 'birthDay',
    },
    birthPlace: {
        type: DataTypes.STRING,
        field: 'birthPlace',
    },
    address: {
        type: DataTypes.STRING,
        field: 'address',
    },
    resume: {
        type: DataTypes.STRING,
        field: 'resume',
    },
    hobby: {
        type: DataTypes.STRING,
        field: 'hobby',
    },
    school: {
        type: DataTypes.STRING,
        field: 'school',
    },
    level: {
        type: DataTypes.STRING,
        field: 'level',
    },
    status: {
        type: DataTypes.STRING,
        field: 'status',
    },
    createAt: {
        type: DataTypes.DATE,
        field: 'createAt',
    },
    updateAt: {
        type: DataTypes.DATE,
        field: 'updateAt'
    },
},{ tableName: 'users',timestamps: false })

module.exports = User