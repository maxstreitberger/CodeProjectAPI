import { queryField } from '@nexus/schema'

const allCities = queryField('allCities', {
  type: 'City',
  nullable: false,
  list: true,
  resolve(_root, _args, { db }) {
    return db.city.findMany()
  }
})

export const CityQueries = [allCities]