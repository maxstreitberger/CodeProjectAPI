const { checkIfUserIsLoggedIn } = require("../utils")

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

module.exports = {
  events,
  event
}