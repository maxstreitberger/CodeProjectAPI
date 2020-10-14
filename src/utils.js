const jwt = require('jsonwebtoken')

function getUserId(context) {
  const authorization = context.request.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const { sub } = jwt.verify(token, APP_SECRET)
    return sub
  }

  throw new Error('Not authenticated')
}

function checkIfUserIsLoggedIn(context) {
  const authorization = context.request.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    if (jwt.verify(token, APP_SECRET)) {
      return true
    }
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
  checkIfUserIsLoggedIn
}
