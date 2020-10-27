import { extendType, stringArg } from '@nexus/schema'

export const EventQueries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allEvents', {
      nullable: false,
      type: 'Event',
      resolve(_root, _args, ctx) {
        return ctx.db.event.findMany()
      }
    })

    t.field('getEvent', {
      nullable: true,
      type: 'Event',
      args: {
        event_id: stringArg({ required: true })
      },
      resolve(_root, args, ctx) {
        return ctx.db.event.findOne({
          where: { event_id: args.event_id }
        })
      }
    })
  }
})