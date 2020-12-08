import { mutationField, stringArg } from '@nexus/schema'
import xss from 'xss';

const createCountry = mutationField('createCountry', {
  type: 'Country',
  args: {
    name: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    const name = xss(args.name);

    return db.countries.create({
      data: {
        name: name
      }
    })
  }
})

const deleteCountry = mutationField('deleteCountry', {
  type: 'Country',
  args: {
    name: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.countries.delete({
      where: {
        name: args.name
      }
    })
  }
})

export const CountryMutations = [createCountry, deleteCountry]