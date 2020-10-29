import { queryField, stringArg } from '@nexus/schema'

const allGuests = queryField('allGuests', {
  type: "Guest",
  list: true,
  nullable: true,
  resolve(_root, _args, { db }) {
    return db.user_Event.findMany()
  }
})

const guestFromEvent = queryField('guestsFromEvent', {
  type: "Guest",
  list: true,
  nullable: true,
  args: {
    event_id: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.user_Event.findMany({
      where: {
        event_id: args.event_id
      }
    })
  }
})

export const GuestQueries = [allGuests, guestFromEvent]