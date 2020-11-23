import { objectType } from '@nexus/schema'

export const Country = objectType({
  name: "Country",
  definition(t) {
    t.string("name")
    t.field('events', {
      type: 'Event',
      nullable: false,
      resolve: async(root, _args, { db }) => {
        //@ts-ignore
        return root.events || (await db.city.findMany({ where: { city_id: root.city_id } }).events())
      }
    })
  }
})