import { idArg, queryField, stringArg } from '@nexus/schema'

const allGuestOfTheEvent = queryField('allGuestOfTheEvent', {
  type: "Guest",
  list: true,
  nullable: true,
  args: {
    event_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.user_event.findMany({
      where: {
        event_id: args.event_id
      }
    })
  }
})

export const GuestQueries = [allGuestOfTheEvent]