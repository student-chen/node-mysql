/**
 * 发送邮件验证码的中间件
 * 根据用户输入的邮箱发送随机6位验证码到指定邮箱
 */

const nodemailer = require('nodemailer')

// 发送邮件
function sendEmail(data) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    auth: { user: '3196614820@qq.com', pass: 'tawbczpzauomdeca' }
  })
  let mailOptions = {
    from: '3196614820@qq.com',
    to: data.email,
    subject: '邮箱登录验证码',
    html: data.content
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error)
    console.log('邮件发送成功 ID：', info.messageId)
  })
  return true
}

module.exports = sendEmail