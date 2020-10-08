function events(parent, args, context) {
  return context.prisma.user.findOne({ where: { user_id: parent.user_id } }).events()
}

module.exports = {
  events,
}