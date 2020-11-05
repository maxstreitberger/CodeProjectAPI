import { objectType } from '@nexus/schema'

export const EventTask = objectType({
  name: "EventTask",
  definition(t) {
    t.string('event_task_id')
    t.string('title')
    t.string('description')
    t.string('deadline')
    t.field('event', {
      type: 'Event',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.event || (await db.eventTask.findOne({ where: { event_task_id: root.event_task_id } }).event())
      }
    })
    t.field('created_by', {
      type: 'User',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.created_by || (await db.eventTask.findOne({ where: { event_task_id: root.event_task_id } }).created_by())
      }
    })
  }
})