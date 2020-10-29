import { queryField, stringArg } from '@nexus/schema'

const allPrivateTasks = queryField('allPrivateTasks', {
  type: 'PrivateTask',
  list: true,
  nullable: true,
  resolve(_root, _args, { db }) {
    return db.privateTask.findMany()
  }
})

const getPrivateTask = queryField('getPrivateTask', {
  type: 'PrivateTask',
  args: {
    private_task_id: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.privateTask.findOne({
      where: {
        private_task_id: args.private_task_id
      }
    })
  }
})

export const PrivateTaskQueries = [allPrivateTasks, getPrivateTask]