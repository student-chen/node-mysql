/**
 * 验证是否登录的中间件
 * 调用接口前验证是否在请求头设置token以及token的合法性
 */
module.exports = () => {
  const jwt = require('jsonwebtoken')
  const User = require('../models/User')
  return async (req, res, next) => {
    // 获取前端传递的请求的请求头文件中得到token
    // 这里需要将authorization中的"Bearer "去除掉来获取完整的token
    const token = String(req.headers.authorization || '').split(' ').pop()
    if(!token) return res.send({ status: 401, message: '请先登录', type: 'error', resultValue: false})
    // 验证token是否合法,这里如果你是mongodb可以使用浅拷贝，mysql最好是使用深拷贝JSON.parse(JSON.stringify(token))
    const { objId } = jwt.verify(JSON.parse(JSON.stringify(token)), req.app.get('superSecret'))
    if(!objId) return res.send({ status: 401, message: '请先登录', type: 'error', resultValue: false})
    // 利用合法token查询数据库内的对应objId的用户
    req.user = await User.findOne({ where: { objId } })
    if(!req.user) return res.send({ status: 401, message: '请先登录', type: 'error', resultValue: false})
    await next()
  }
}