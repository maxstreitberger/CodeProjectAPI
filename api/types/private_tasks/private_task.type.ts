import { objectType } from '@nexus/schema'

export const PrivateTask = objectType({
  name: "PrivateTask",
  definition(t) {
    t.string('private_task_id')
    t.string('title')
    t.string('description')
    t.date('deadline')
    t.boolean('done')
  }
})