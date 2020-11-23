import { mutationField, stringArg } from '@nexus/schema'

const createCountry = mutationField('createCountry', {
  type: 'Country',
  args: {
    name: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.country.create({
      data: {
        name: args.name
      }
    })
  }
})

export const CountryMutations = [createCountry]