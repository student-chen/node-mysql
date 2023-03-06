/**
 * 用户列表的新增、删除(可批量)、修改、查询
 */

module.exports = app => {
  const express = require('express')
  const moment = require('moment')
  const router = express.Router({ mergeParams: true })
  const UUID = require('uuid')
  const bcrypt = require('bcryptjs')
  const User = require('../models/User')
  const isNeedLoginMiddleWare = require('../middlewares/isNeedLogin')
  const filterParams = require('../utils/common')

  // 用户权限之一：新增用户
  router.post('/addOneUser', async (req, res) => {
    const createAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const objId = UUID.v1()
    const { account, password, user_name, email, sex, age, birthDay, birthPlace, address, resume, hobby, level, status, permission } = req.body
    if (permission !== '1') return res.send({ status: 400, message: '当前用户无权限新增' })
    // 加密明文密码
    const salt = bcrypt.genSaltSync(10)
    const newPsd = bcrypt.hashSync(password, salt)
    const addData = { objId, account, password: newPsd, email, user_name, sex, age, birthDay, birthPlace, address, resume, hobby, level, status, createAt }
    // 检查当前账号是否注入表内
    const findRes = await User.findOne({ where: { account } })
    if (findRes) return res.send({ status: 400, message: '当前账号已被注册，请重新输入', type: 'error', resultValue: '' })
    const createRes = await User.create(addData)
    if(!createRes) return res.send({ status: 500, message: '注册失败', type: 'failure' })
    res.send({ status: 200, message: '注册成功,请前往登录', type: 'success', resultValue: true })
    res.end()
  })

  // 用户权限之一： 删除用户
  router.post('/deleteOneUser', async (req, res) => {
    const { objId, permission } = req.body
    if (permission !== '1') return res.send({ status: 400, message: '当前用户无权限删除' })
    const findRes = await User.findOne({ where: { objId } })
    if (!findRes) return res.send({ status: 400, message: '该用户尚未注册', resultValue: false, type: 'error' })
    await User.destroy({ where: { objId } })
    res.send({ status: 200, message: '已删除该用户', resultValue: true, type: 'success'})
    res.end()
  })

  // 用户权限之一： 批量删除用户
  router.post('/deleteSomeUser', async (req, res) => {
    const { objId, permission } = req.body
    if (permission !== '1') return res.send({ status: 400, message: '当前用户无权限删除' })
    const objIds = objId.split(',')
    // if(!objIds.length) return 前端处理至少选两条数据删除
    for (let index = 0; index < objIds.length; index++) {
      await User.destroy({ where: { objId: objIds[index] } })
    }
    res.send({ status: 200, message: '已完成批量删除', resultValue: true, type: 'success'})
    res.end()
  })

  // 用户权限之一： 修改用户信息
  router.post('/updateUser', async (req, res) => {
    const { objId, password, permission } = req.body
    if (permission !== '1') return res.send({ status: 400, message: '当前用户无权限修改' })
    let newData = {}
    if(password) {
      const salt = bcrypt.genSaltSync(10)
      const newPsd = bcrypt.hashSync(password, salt)
      newData = {...req.body, password: newPsd}
    }
    const findRes = await User.findOne({ where: { objId } })
    if(!findRes) return res.send({ status: 400, type: 'failure', message: '用户不存在'})
    await User.update(newData, { where: { objId }})
    const findUser = await User.findOne({ where: { objId } })
    res.send({ status: 200, message: '已更新数据', resultValue: findUser, type: 'success'})
    res.end()
  })

  // 查询(可使用条件查询)
  router.post('/searchUser', async (req, res) => {
    let searchData
    // 设置用户状态、用户等级、用户地址、用户年龄、用户性别位查询条件
    const { status, address, sex, level, age, school } = req.body
    const params = filterParams({ status, address, sex, level, age, school })
    searchData = await User.findAll({ where: params }, { raw: true })
    if(!searchData.length) return res.send({ status: 200, message: '暂无数据', resultValue: false, type: 'success'})
    res.send({
      status: 200,
      message: '查询成功',
      resultValue: {
        items: searchData,
        count: searchData.length
      },
      type: 'success'})
    res.end()
  })

  /**
   * 处理路由根路径
   * 设置请求路径: http://127.0.0.1:3000/api/v1 + (router文件内的路径)
   * 路由校验是否已登录中间件：isNeedLoginMiddleWare()
   */
  app.use('/api/v1', isNeedLoginMiddleWare(), router)
}