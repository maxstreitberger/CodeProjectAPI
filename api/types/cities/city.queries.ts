import { queryField, stringArg } from '@nexus/schema'

const allCities = queryField('allCities', {
  type: 'City',
  nullable: false,
  list: true,
  resolve(_root, _args, { db }) {
    return db.city.findMany()
  }
})

const allEventsFromCity = queryField('allEventsFromCity', {
  type: 'Event',
  nullable: false,
  list: true,
  args: {
    city: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.event.findMany({
      where: {
        city: {
          name: args.city
        }
      }
    })
  }
})

export const CityQueries = [allCities, allEventsFromCity]