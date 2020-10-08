function host(parent, args, context) {
  return context.prisma.event.findOne({
    where: {
      event_id: parent.event_id
    }
  }).host()
}

module.exports = {
  host,
}