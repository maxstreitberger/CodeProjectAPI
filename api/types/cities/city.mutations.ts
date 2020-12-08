import { mutationField, stringArg } from '@nexus/schema'
import xss from 'xss';

const createCity = mutationField('createCity', {
  type: 'City',
  args: {
    name: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    const name = xss(args.name);

    return db.cities.create({
      data: {
        name: name
      }
    })
  }
})

const deleteCity = mutationField('deleteCity', {
  type: 'City',
  args: {
    name: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.cities.delete({
      where: {
        name: args.name
      }
    })
  }
})

export const CityMutations = [createCity, deleteCity]