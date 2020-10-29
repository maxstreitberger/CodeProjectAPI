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
        console.log(root)
        //@ts-ignore
        return root.host || (await db.event.findOne({ where: { event_id: root.event_id } }).host())
      }
    })
    t.list.field('tasks', {
      type: 'EventTask',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        console.log(root)
        //@ts-ignore
        return root.tasks || (await db.event.findOne({ where: { event_id: root.event_id } }).tasks())
      }
    })
    t.list.field('guests', {
      type: 'Guest',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        console.log(root)
        //@ts-ignore
        return root.guests || (await db.event.findOne({ where: { event_id: root.event_id } }).guests())
      }
    })
  }
})
