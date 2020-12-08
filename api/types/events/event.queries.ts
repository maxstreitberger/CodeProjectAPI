import { idArg, intArg, queryField, stringArg } from '@nexus/schema'

const allPublicEvents = queryField('allPublicEvents', {
  nullable: false,
  list: true,
  type: 'Event',
  args: {
    take: intArg({ required: true }),
    skip: intArg({ required: false }),
  },
  resolve(_root, args, { db }) {
    let takeLimit: number = args.take > 50 ? 50 : args.take
    let skipLimit: number = args.skip ? args.skip :  0
    return db.events.findMany({
      take: takeLimit,
      skip: skipLimit,
      where: {
        is_public: true
      }
    })
  }
})

const getEvent = queryField('getEvent', {
  type: 'Event',
  args: {
    event_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.events.findOne({
      where: { event_id: args.event_id }
    })
  }
})

const myEvents = queryField('myEvents', {
  type: 'Event',
  list: true,
  nullable: true,
  args: {
    take: intArg({ required: true }),
    skip: intArg({ required: false }),
  },
  resolve(_root, args, { db, user }) {
    let takeLimit: number = args.take > 50 ? 50 : args.take
    let skipLimit: number = args.skip ? args.skip :  0
    return db.events.findMany({
      take: takeLimit,
      skip: skipLimit,
      where: {
        host: {
          user_id: user.user_id
        }
      },
      orderBy: {
        date: "desc"
      }
    })
  }
})

export const EventQueries = [allPublicEvents, getEvent, myEvents]