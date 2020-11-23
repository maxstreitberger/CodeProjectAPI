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
    t.string('event_start')
    t.string('street_and_house_number')
    t.string('zip') 
    t.date('date')
    t.string('city') 
    t.string('country') 
    t.string('meeting_link')
    t.string('event_type')
    t.boolean('is_public')
    t.string('event_color')
    t.field('host', {
      type: 'User',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.host || (await db.event.findOne({ where: { event_id: root.event_id } }).host())
      }
    })
    t.list.field('tasks', {
      type: 'EventTask',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.tasks || (await db.event.findOne({ where: { event_id: root.event_id } }).tasks())
      }
    })
    t.list.field('guests', {
      type: 'Guest',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.guests || (await db.event.findOne({ where: { event_id: root.event_id } }).guests())
      }
    })
    t.list.field('surveys', {
      type: 'Survey',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.surveys || (await db.event.findOne({ where: { event_id: root.event_id } }).surveys())
      }
    })
  }
})
