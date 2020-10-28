import { extendType, stringArg } from '@nexus/schema'

export const EventMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createEvent', {
      type: 'Event',
      args: {
        title: stringArg({ required: true }),
        description: stringArg({required: false}),
        date: stringArg({ required: false }),
        event_start: stringArg({ required: false })
      },
      resolve(_root, args, ctx) {
        return ctx.db.event.create({
          data: {
            title: args.title,
            description: args.description,
            date: args.date,
            event_start: args.event_start,
            host: {
              connect: {
                user_id: ctx.user.user_id
              }
            }
          }
        })
      }
    })

    t.field('updateEvent', {
      type: 'Event',
      args: {
        event_id: stringArg({ required: true }),
        title: stringArg({ required: false }),
        description: stringArg({ required: false }),
        date: stringArg({ required: false }),
        event_start: stringArg({ required: false })
      },
      resolve(_root, args, ctx) {
        return ctx.db.event.update({
          where: {
            event_id: args.event_id
          },
          data: {
            ...args
          }
        })
      }
    })

    t.field('deleteEvent', {
      type: 'Event',
      args: {
        event_id: stringArg({ required: true })
      },
      resolve(_root, args, ctx) {
        return ctx.db.event.delete({
          where: {
            event_id: args.event_id
          }
        })
      }
    })
  }
})