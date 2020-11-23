import { queryField } from '@nexus/schema'

const allCountries = queryField('allCountries', {
  type: 'Country',
  nullable: false,
  list: true,
  resolve(_root, _args, { db }) {
    return db.country.findMany()
  }
})

export const CountryQueries = [allCountries]