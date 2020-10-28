import { objectType, scalarType } from '@nexus/schema'

// export const DateScalar = scalarType({
//   name: 'Date',
//   asNexusMethod: 'date',
//   description: 'Date custom scalar type'
// })

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.string('event_id')
    t.string('title')
    t.string('description')
    t.string('date')
    t.string('event_start')
    t.field('host', {
      type: 'User',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.host || (await db.event.findOne({ where: { event_id: root.event_id } }).host())
      },
    })
  }
})
