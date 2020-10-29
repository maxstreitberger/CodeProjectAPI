import { queryField, stringArg } from '@nexus/schema'

const allEvents = queryField('allEvents', {
  nullable: false,
  list: true,
  type: 'Event',
  resolve(_root, _args, { db }) {
    return db.event.findMany()
  }
})

const getEvent = queryField('getEvent', {
  nullable: true,
  type: 'Event',
  args: {
    event_id: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.event.findOne({
      where: { event_id: args.event_id }
    })
  }
})

export const EventQueries = [allEvents, getEvent]