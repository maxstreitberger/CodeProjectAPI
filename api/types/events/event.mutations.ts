import { booleanArg, idArg, mutationField, stringArg } from '@nexus/schema'
import { EventType } from '@prisma/client'

const createEvent = mutationField('createEvent', {
  type: 'Event',
  args: {
    title: stringArg({ required: true }),
    date: stringArg({ required: true }),
    event_start: stringArg({ required: true }),
    event_type: stringArg({ required: true }),
    is_public: booleanArg({ required: true }),

    description: stringArg({ required: false }),
    street_and_house_number: stringArg({ required: false }),
    zip: stringArg({ required: false }),
    city: stringArg({ required: true }),
    country: stringArg({ required: true }),
    link: stringArg({ required: false })
  },
  resolve(_root, args, ctx) {
    return ctx.db.event.create({
      data: {
        title: args.title,
        date: new Date(args.date),
        event_start: args.event_start,
        description: args.description,
        street_and_house_number: args.street_and_house_number,
        zip: args.zip,
        city: {
          connect: {
            name: args.city
          }
        },
        country: {
          connect: {
            name: args.country
          }
        },
        meeting_link: args.link,
        event_type: args.event_type as EventType,
        is_public: args.is_public,
        host: {
          connect: {
            user_id: ctx.user.user_id
          }
        }
      }
    })
  }
})

const updateEvent = mutationField('updateEvent', {
  type: 'Event',
  args: {
    event_id: idArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    date: stringArg({ required: true }),
    event_start: stringArg({ required: true })
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

const deleteEvent = mutationField('deleteEvent', {
  type: 'Event',
  args: {
    event_id: idArg({ required: true })
  },
  resolve(_root, args, ctx) {
    return ctx.db.event.delete({
      where: {
        event_id: args.event_id
      }
    })
  }
})

export const EventMutations = [createEvent, updateEvent, deleteEvent]