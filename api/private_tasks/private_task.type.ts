import { objectType } from '@nexus/schema'

export const PrivateTask = objectType({
  name: "PrivateTask",
  definition(t) {
    t.string('private_task_id')
    t.string('title')
    t.string('description')
    t.string('deadline')
    // t.field('created_by', {
    //   type: 'User',
    //   nullable: false,
    //   resolve: async (root, _args, { db }) => {
    //     //@ts-ignore
    //     return root.created_by || (await db.eventTask.findOne({ where: { task_id: root.task_id } }).created_by())
    //   }
    // })
  }
})