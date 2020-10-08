function events(parent, args, context, info) {
  return context.prisma.event.findMany()
}

module.exports = {
  events,
}