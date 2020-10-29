import { objectType } from '@nexus/schema'

export const EventTask = objectType({
  name: "EventTask",
  definition(t) {
    t.string('task_id')
    t.string('title')
    t.string('description')
    t.string('deadline')
    t.field('event', {
      type: 'Event',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.event || (await db.eventTask.findOne({ where: { task_id: root.task_id } }).event())
      }
    })
    t.field('createdBy', {
      type: 'User',
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.createdBy || (await db.eventTask.findOne({ where: { task_id: root.task_id } }).createdBy())
      }
    })
  }
})