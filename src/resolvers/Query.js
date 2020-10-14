const { checkIfUserIsLoggedIn } = require('../utils')

function events(parent, args, context, info) {
  return context.prisma.event.findMany()
}

function event(parent, args, context, info) {
  if (checkIfUserIsLoggedIn(context)) {
    return context.prisma.event.findOne({
      where: {
        event_id: args.event_id
      }
    })
  }
}

function allUsers(parent, args, context) {
  return context.prisma.user.findMany()
}

function user(parent, args, context) {
  return context.prisma.user.findOne({
    where: {
      user_id: args.user_id
    }
  })
}

module.exports = {
  events,
  event,
  user,
  allUsers
}