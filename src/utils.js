const jwt = require('jsonwebtoken')
const APP_SECRET = 'CODE-PROJECT'

function getUserId(context) {
  const authorization = context.request.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    console.log('👨🏽‍💻: '+ userId)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}