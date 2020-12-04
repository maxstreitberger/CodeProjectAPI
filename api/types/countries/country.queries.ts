import { queryField, stringArg } from '@nexus/schema'

const allCountries = queryField('allCountries', {
  type: 'Country',
  nullable: false,
  list: true,
  resolve(_root, _args, { db }) {
    return db.countries.findMany()
  }
})

const allEventsFromCountry = queryField('allEventsFromCountry', {
  type: 'Event',
  nullable: false,
  list: true,
  args: {
    country: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.events.findMany({
      where: {
        country: {
          name: args.country
        }
      }
    })
  }
})

export const CountryQueries = [allCountries, allEventsFromCountry]