module.exports = app => {
    const express = require('express')
    const moment = require('moment')
    const router = express.Router()
    const User = require('../models/User')
    const UUID = require('uuid')
    const sendEmail = require('../middlewares/email')
    const configCode = require('../config/index')
    const LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch')
    const jwt = require('jsonwebtoken')
    const privateKey = app.get("superSecret")
    const assert = require('http-assert')
    const bcrypt = require('bcryptjs')

    // 注册
    router.post('/register', async (req, res) => {
        const createAt = moment().format('YYYY-MM-DD HH:mm:ss')
        const objId = UUID.v1()
        const { account, password, user_name, email, sex, age, birthDay, birthPlace, address, resume, hobby, level, status } = req.body
        // 加密明文密码
        const salt = bcrypt.genSaltSync(10)
        const newPsd = bcrypt.hashSync(password, salt)
        const registerData = { objId, account, password: newPsd, email, user_name, sex, age, birthDay, birthPlace, address, resume, hobby, level, status, createAt }
        // 注册前需要先再数据库表内看看有没有用这个账号注册过的用户
        const findResult = await User.findOne({ where: { account } })
        if(findResult) return res.send({ status: 300, message: '当前账号已被注册，请重新输入', type: 'error', hasUser: true })
        const createResult = await User.create(registerData)
        if(!createResult) return res.send({ status: 500, message: '注册失败', type: 'failure' })
        res.send({ status: 200, message: '注册成功,请前往登录', type: 'success', resultValue: true })
        res.end()
    })

    // 账号登录
    router.post('/loginAccount', async (req, res) => {
        const { account, password } = req.body
        const findUser = await User.findOne({ where: { account } }) // 看数据库有没有这个人
        assert(findUser, 400, "用户不存在")
        const isPass = bcrypt.compareSync(password, findUser.password)  // 校验密码
        assert(isPass, 400, "密码错误")
        const token = jwt.sign({ objId: findUser.objId }, privateKey)
        res.send({ status: 200, type: 'success', message: '登录成功', resultValue: findUser, token })
        res.end()
    })

    // 发送邮箱验证码
    router.post('/sendCode', async (req, res) => {
        const randomCode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
        console.log(randomCode)
        const { account } = req.body
        const content = configCode(account, randomCode)
        const sendResult = sendEmail({ email: account, content })
        if(!sendResult) return res.send({ status: 400, type: 'failure', message: '发送失败，服务器未响应'})
        res.send({ status: 200, type: 'success', message: '验证码已发送至您的邮箱，查收'})
        localStorage.setItem('randomCode', randomCode)
        res.end()
    })

    // 邮箱登录
    router.post('/loginEmail', async (req, res) => {
        const randomCode = localStorage.getItem('randomCode')
        const { account, code } = req.body
        if(code !== randomCode) return res.send({ status: 400, message: '当前输入的验证码与发送不一致，请确认' })
        const findResult = await User.findOne({ where: { account } })
        console.log(findResult)
        if(!findResult) return res.send({ status: 400, message: '该账号未注册,请先注册' })
        const token = jwt.sign({ objId: findResult.objId}, privateKey)
        res.send({ status: 200, type: 'success', message: '登录成功', resultValue: findResult, token })
        res.end()
    })

    /**
     * 处理路由根路径
     * 设置请求路径: http://127.0.0.1:3000/api/v1 + (router文件内的路径)
     */
    app.use('/api/v1', router)
}



