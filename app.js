const Koa = require('koa')
const Router = require('koa-router')
const { SERVE_ADDRESS, APP_PORT } = require('./config.default')
const app = new Koa()
const router = new Router()

app.use(router.routes)
app.use(router.allowedMethods())

app.listen(APP_PORT, () => { console.log(`server is starting：${SERVE_ADDRESS}:${APP_PORT}`) })
