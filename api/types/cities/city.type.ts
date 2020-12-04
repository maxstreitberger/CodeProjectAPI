import { objectType } from '@nexus/schema'

export const City = objectType({
  name: "City",
  definition(t) {
    t.string("name")
    t.field('events', {
      type: 'Event',
      nullable: false,
      list: true,
      resolve: async(root, _args, { db }) => {
        //@ts-ignore
        return root.events || (await db.cities.findOne({ where: { name: root.name } }).events())
      }
    })
  }
})