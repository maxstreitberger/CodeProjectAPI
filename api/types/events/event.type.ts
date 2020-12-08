import { objectType } from '@nexus/schema'

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.string('event_id') 
    t.string('title')
    t.string('description')
    t.string('event_start')
    t.string('street_and_house_number')
    t.int('zip') 
    t.date('date')
    t.string('meeting_link')
    t.string('event_type')
    t.boolean('is_public')
    t.string('event_color')
    t.field('host', {
      type: 'User',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.host || (await db.events.findOne({ where: { event_id: root.event_id } }).host())
      }
    })
    t.list.field('tasks', {
      type: 'EventTask',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.tasks || (await db.events.findOne({ where: { event_id: root.event_id } }).tasks())
      }
    })
    t.list.field('invited_users', {
      type: 'Guest',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.guests || (await db.events.findOne({ where: { event_id: root.event_id } }).guests())
      }
    })
    t.list.field('surveys', {
      type: 'Survey',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.surveys || (await db.events.findOne({ where: { event_id: root.event_id } }).surveys())
      }
    })
    t.field('city', {
      type: 'City',
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.city || (await db.events.findOne({ where: { event_id: root.event_id } }).city())
      }
    })
    t.field('country', {
      type: 'Country',
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.country || (await db.events.findOne({ where: { event_id: root.event_id } }).country())
      }
    })
  }
})
