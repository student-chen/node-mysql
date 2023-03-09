/**
 * 超级管理员可定义或者取消(普通用户、管理角色)用户角色、新建、删除、查询角色
 */
module.exports = app => {
  const express = require('express')
  const router = express.Router({ mergeParams: true })
  const User = require('../models/User')
  const Role = require('../models/Role')
  const moment = require('moment')
  User.belongsTo(Role, { foreignKey: 'permission', targetKey: 'permission' })
  const UUID = require('uuid')
  const isNeedLoginMiddleWare = require('../middlewares/isNeedLogin')


  // 新建角色(只能新建管理员与普通用户, 只能单个新建)
  router.post('/addRole', async (req, res) => {
    const { permission, name, permissionType, status } = req.body
    // 后端检查权限，前端也可以
    if (permissionType !== '03') return res.send({ status: 400, message: '当前用户无权限新建角色' })
    const createAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const addData = { objId: UUID.v1(), name, createAt, permission, status }
    const roleResult = await Role.findOne({ where: { permission } })
    if (roleResult) return res.send({ status: 400, message: '当前角色已生成', type: 'error', resultValue: false })
    const createRoleResult = await Role.create(addData)
    if(!createRoleResult) return res.send({ status: 400, message: '角色创建失败', type: 'failure' })
    res.send({ status: 200, message: '角色创建成功', type: 'success', resultValue: createRoleResult })
    res.end()
  })

  // 删除角色
  router.post('/deleteRole', async (req, res) => {
    const { permission, name, permissionType } = req.body
    // 后端检查权限，前端也可以
    if (permissionType !== '03') return res.send({ status: 400, message: '当前用户无权限新建角色' })
    const roleResult = await Role.findOne({ where: { permission, name } })
    if (!roleResult) return res.send({ status: 400, message: '暂无该角色', type: 'error', resultValue: false })
    await Role.destroy({ where: { permission } })
    res.send({ status: 200, message: '已删除该角色', resultValue: true, type: 'success'})
    res.end()
  })
  /**
   * 处理路由根路径
   * 设置请求路径: http://127.0.0.1:3000/api/v1 + (router文件内的路径)
   * 路由校验是否已登录中间件：isNeedLoginMiddleWare()
   */
  app.use('/api/v1', isNeedLoginMiddleWare(), router)
}