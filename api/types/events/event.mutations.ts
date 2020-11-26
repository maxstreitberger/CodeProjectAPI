import { booleanArg, idArg, mutationField, stringArg } from '@nexus/schema'
import { EventType } from '@prisma/client'

const createLocalEvent = mutationField('createLocalEvent', {
  type: 'Event',
  args: {
    title: stringArg({ required: true }),
    date: stringArg({ required: true }),
    event_start: stringArg({ required: true }),
    is_public: booleanArg({ required: true }),
    street_and_house_number: stringArg({ required: true }),
    zip: stringArg({ required: true }),
    city: stringArg({ required: true }),
    country: stringArg({ required: true }),

    description: stringArg({ required: false })
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
        event_type: EventType.LOCAL,
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

const createOnlineEvent = mutationField('createOnlineEvent', {
  type: 'Event',
  args: {
    title: stringArg({ required: true }),
    date: stringArg({ required: true }),
    event_start: stringArg({ required: true }),
    is_public: booleanArg({ required: true }),
    link: stringArg({ required: true }),

    description: stringArg({ required: false })
  },
  resolve(_root, args, ctx) {
    return ctx.db.event.create({
      data: {
        title: args.title,
        date: new Date(args.date),
        event_start: args.event_start,
        description: args.description,
        meeting_link: args.link,
        event_type: EventType.ONLINE,
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

const updateLocalEvent = mutationField('updateLocalEvent', {
  type: 'Event',
  args: {
    event_id: idArg({ required: true }),
    title: stringArg({ required: false }),
    date: stringArg({ required: false }),
    event_start: stringArg({ required: false }),
    event_type: stringArg({ required: false }),
    is_public: booleanArg({ required: false }),
    street_and_house_number: stringArg({ required: false }),
    zip: stringArg({ required: false }),
    city: stringArg({ required: true }),
    country: stringArg({ required: true }),

    description: stringArg({ required: false })
  },
  resolve(_root, args, ctx) {
    return ctx.db.event.update({
      where: {
        event_id: args.event_id
      },
      data: {
        ...args,
        event_type: args.event_type as EventType,
        city: {
          connect: {
            name: args.city
          }
        },
        country: {
          connect: {
            name: args.country
          }
        }
      }
    })
  }
})

const updateOnlineEvent = mutationField('updateOnlineEvent', {
  type: 'Event',
  args: {
    event_id: idArg({ required: true }),
    title: stringArg({ required: false }),
    date: stringArg({ required: false }),
    event_start: stringArg({ required: false }),
    event_type: stringArg({ required: false }),
    is_public: booleanArg({ required: false }),
    link: stringArg({ required: false }),

    description: stringArg({ required: false })
  },
  resolve(_root, args, ctx) {
    return ctx.db.event.update({
      where: {
        event_id: args.event_id
      },
      data: {
        ...args,
        event_type: args.event_type as EventType,
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
      },
      include: {
        city: {},
        country: {},
      }
    })
  }
})

export const EventMutations = [createLocalEvent, createOnlineEvent, updateLocalEvent, updateOnlineEvent, deleteEvent]