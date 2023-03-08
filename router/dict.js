/**
 * 获取全局字典路由
 */
module.exports = app => {
  const express = require('express')
  const router = express.Router({ mergeParams: true })
  const Dict = require('../models/Dict')
  const DictType = require('../models/Dict_type')
  Dict.hasOne(DictType)
  Dict.belongsTo(DictType, { foreignKey: 'type', targetKey: 'type' })
  const isNeedLoginMiddleWare = require('../middlewares/isNeedLogin')

  router.post('/getDictConfig', async (req, res) => {
    const { rows, count } = await Dict.findAndCountAll({
      attributes: ['value', 'codeValue', 'type'],
      include: [{ attributes: ['name'], model: DictType }],
    })
    const statusArr = rows.filter(item => item.type === 'status').map(it => { return { text: it.value, codeValue: it.codeValue } })
    const levelArr = rows.filter(item => item.type === 'level').map(it => { return { text: it.value, codeValue: it.codeValue } })
    const permissionArr = rows.filter(item => item.type === 'permission').map(it => { return { text: it.value, codeValue: it.codeValue } })
    const sexArr= rows.filter(item => item.type === 'sex').map(it => { return { text: it.value, codeValue: it.codeValue } })
    const statusDict = { name: 'status', dict: statusArr }
    const permissionDict = { name: 'permission', dict: permissionArr }
    const sexDict = { name: 'sex', dict: sexArr }
    const levelDict = { name: 'level', dict: levelArr }
    const resultValue = [statusDict, permissionDict, levelDict, sexDict]
    res.send({ status: 200, message: '获取全局字典成功', count, resultValue, type: 'success'})
    res.end()
  })

  /**
   * 处理路由根路径
   * 设置请求路径: http://127.0.0.1:3000/api/v1 + (router文件内的路径)
   * 路由校验是否已登录中间件：isNeedLoginMiddleWare()
   */
  app.use('/api/v1', isNeedLoginMiddleWare(), router)
}