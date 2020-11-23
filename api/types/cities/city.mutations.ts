import { mutationField, stringArg } from '@nexus/schema'

const createCity = mutationField('createCity', {
  type: 'City',
  args: {
    name: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.city.create({
      data: {
        name: args.name
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
    return db.city.delete({
      where: {
        name: args.name
      }
    })
  }
})

export const CityMutations = [createCity, deleteCity]