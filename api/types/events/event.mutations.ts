import { sanitizeUrl } from '@braintree/sanitize-url'
import { booleanArg, idArg, intArg, mutationField, stringArg } from '@nexus/schema'
import { EventType } from '@prisma/client'
import { AuthenticationError } from 'apollo-server'
import xss from 'xss'

const createLocalEvent = mutationField('createLocalEvent', {
  type: 'Event',
  args: {
    title: stringArg({ required: true }),
    date: stringArg({ required: true }),
    event_start: stringArg({ required: true }),
    is_public: booleanArg({ required: true }),
    street_and_house_number: stringArg({ required: true }),
    zip: intArg({ required: true }),
    city: stringArg({ required: true }),
    country: stringArg({ required: true }),

    description: stringArg({ required: false })
  },
  resolve(_root, args, ctx) {
    const title = xss(args.title);
    const date = xss(args.date)
    const start = xss(args.event_start);
    const street_and_house_number = xss(args.street_and_house_number);
    const city = xss(args.city);
    const country = xss(args.country);
    const description = xss(args.description ? args.description : '')

    return ctx.db.events.create({
      data: {
        title: title,
        date: new Date(date),
        event_start: start,
        description: description,
        street_and_house_number: street_and_house_number,
        zip: args.zip,
        city: {
          connect: {
            name: city
          }
        },
        country: {
          connect: {
            name: country
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
    const title = xss(args.title);
    const date = xss(args.date)
    const start = xss(args.event_start);
    const description = xss(args.description ? args.description : '')

    return ctx.db.events.create({
      data: {
        title: title,
        date: new Date(date),
        event_start: start,
        description: description,
        meeting_link: sanitizeUrl(args.link),
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
    title: stringArg({ required: true }),
    date: stringArg({ required: true }),
    event_start: stringArg({ required: false }),
    event_type: stringArg({ required: false }),
    is_public: booleanArg({ required: false }),
    street_and_house_number: stringArg({ required: false }),
    zip: intArg({ required: false }),
    city: stringArg({ required: true }),
    country: stringArg({ required: true }),

    description: stringArg({ required: false })
  },
  resolve: async(_root, args, { db, user }) => {
    const currentEvent = await db.events.findOne({
      where: {
        event_id: args.event_id
      }
    })

    if (user.user_id == currentEvent?.host_id) {
      return db.events.update({
        where: {
          event_id: args.event_id
        },
        data: {
          ...args,
          event_type: args.event_type as EventType,
          date: new Date(args.date),
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
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const updateOnlineEvent = mutationField('updateOnlineEvent', {
  type: 'Event',
  args: {
    event_id: idArg({ required: true }),
    title: stringArg({ required: true }),
    date: stringArg({ required: true }),
    event_start: stringArg({ required: true }),
    event_type: stringArg({ required: true }),
    is_public: booleanArg({ required: false }),
    link: stringArg({ required: true }),

    description: stringArg({ required: true })
  },
  resolve: async(_root, args, { db, user }) => {
    const title = xss(args.title);
    const date = xss(args.date)
    const start = xss(args.event_start);
    const description = xss(args.description ? args.description : '')

    const currentEvent = await db.events.findOne({
      where: {
        event_id: args.event_id
      }
    })

    if (user.user_id == currentEvent?.host_id) {
      return db.events.update({
        where: {
          event_id: args.event_id
        },
        data: {
          title: title,
          date: new Date(date),
          event_start: start,
          description: description,
          meeting_link: sanitizeUrl(args.link),
          is_public: args.is_public,
          event_type: args.event_type as EventType,
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const deleteEvent = mutationField('deleteEvent', {
  type: 'Event',
  args: {
    event_id: idArg({ required: true })
  },
  resolve: async(_root, args, { db, user }) => {
    const currentEvent = await db.events.findOne({
      where: {
        event_id: args.event_id
      }
    })
    if (user.user_id == currentEvent?.host_id) {
      return db.events.delete({
        where: {
          event_id: args.event_id
        },
        include: {
          city: {},
          country: {},
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

export const EventMutations = [createLocalEvent, createOnlineEvent, updateLocalEvent, updateOnlineEvent, deleteEvent]