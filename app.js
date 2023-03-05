const express = require('express')
const cors = require("cors");
const { SERVE_ADDRESS, APP_PORT, TOKEN_KEY } = require('./config.default')
const bodyParser = require("body-parser")

const app = express()
app.set('superSecret', TOKEN_KEY)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

require('./router/index')(app)

app.listen(APP_PORT, () => { console.log(`server is starting：${SERVE_ADDRESS}:${APP_PORT}`) })
