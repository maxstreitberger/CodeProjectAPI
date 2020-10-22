require('dotenv').config()
const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.KEY

function checkUser(context) {
  const authorization = context.request.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const { sub, role } = jwt.verify(token, APP_SECRET)
    
    const user = {
      "user_id": sub,
      "role": role
    }

    return user
  }
  return null
}


module.exports = {
  checkUser
}
