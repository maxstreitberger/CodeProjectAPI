import { idArg, queryField, stringArg } from '@nexus/schema'

const allPrivateTasks = queryField('allPrivateTasks', {
  type: 'PrivateTask',
  list: true,
  nullable: true,
  resolve(_root, _args, { db }) {
    return db.private_tasks.findMany()
  }
})

const getPrivateTask = queryField('getPrivateTask', {
  type: 'PrivateTask',
  args: {
    private_task_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.private_tasks.findOne({
      where: {
        private_task_id: args.private_task_id
      }
    })
  }
})

const myPrivateTasks = queryField('myPrivateTasks', {
  type: 'PrivateTask',
  list: true,
  nullable: false,
  resolve(_root, _args, { db, user }) {
    return db.private_tasks.findMany({
      where: {
        user_id: user.user_id
      }
    })
  }
})

const currentTasks = queryField('currentTasks', {
  type: 'PrivateTask',
  list: true,
  nullable: false,
  resolve(_root, _args, { db, user }) {
    return db.private_tasks.findMany({
      where: {
        user_id: user.user_id,
        done: false
      }
    })
  }
})

const doneTasks = queryField('doneTasks', {
  type: 'PrivateTask',
  list: true,
  nullable: false,
  resolve(_root, _args, { db, user }) {
    return db.private_tasks.findMany({
      where: {
        user_id: user.user_id,
        done: true
      }
    })
  }
})

export const PrivateTaskQueries = [allPrivateTasks, getPrivateTask, myPrivateTasks, currentTasks, doneTasks]