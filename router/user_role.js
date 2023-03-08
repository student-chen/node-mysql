/**
 * 超级管理员可定义或者取消(普通用户、管理角色)用户角色、新建、删除、查询角色
 */
module.exports = app => {
  const express = require('express')
  const router = express.Router({ mergeParams: true })
  const User = require('../models/User')
  const Role = require('../models/Role')
  const moment = require('moment')
  User.hasOne(Role)
  User.belongsTo(Role, { foreignKey: 'objId', targetKey: 'userObjId' })
  const isNeedLoginMiddleWare = require('../middlewares/isNeedLogin')

  // 设置用户角色(可批量)
  router.post('/addUserRole', async (req, res) => {
    // 前端需要判断登录的用户是否为超级管理员
    const { objId, permission } = req.body
    const updateAt = moment().format('YYYY-MM-DD HH:mm:ss')
    if (permission === '03') return res.send({ status: 400, message: '当前用户无权限删除' })
    const objIds = objId.split(',')
    for (let index = 0; index < objIds.length; index++) {
      const findRes = await User.findOne({ where: { objId } })
      const updateData = {...findRes, permission, updateAt }
      await User.update(updateData, { where: { objId: objIds[index] }})
    }
    res.send({ status: 200, message: '用户角色设置成功', resultValue: true, type: 'success' })
    res.end()
  })

  /**
   * 处理路由根路径
   * 设置请求路径: http://127.0.0.1:3000/api/v1 + (router文件内的路径)
   * 路由校验是否已登录中间件：isNeedLoginMiddleWare()
   */
  app.use('/api/v1', isNeedLoginMiddleWare(), router)
}