import { objectType } from '@nexus/schema'

export const EventTask = objectType({
  name: "EventTask",
  definition(t) {
    t.string('event_task_id')
    t.string('title')
    t.string('description')
    t.date('deadline')
    t.boolean('done'),
    t.field('event', {
      type: 'Event',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.event || (await db.event_tasks.findOne({ where: { event_task_id: root.event_task_id } }).event())
      }
    })
    t.field('created_by', {
      type: 'User',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.created_by || (await db.event_tasks.findOne({ where: { event_task_id: root.event_task_id } }).created_by())
      }
    })
  }
})