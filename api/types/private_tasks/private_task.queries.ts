import { idArg, queryField, stringArg } from '@nexus/schema'
import { AuthenticationError } from 'apollo-server'

const getPrivateTask = queryField('getPrivateTask', {
  type: 'PrivateTask',
  args: {
    private_task_id: idArg({ required: true })
  },
  resolve: async (_root, args, { db, user }) => {
    const task = await db.private_tasks.findOne({
      where: {
        private_task_id: args.private_task_id,
      }
    })

    if (user.user_id == task?.user_id) {
      return task
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const myTasks = queryField('myTasks', {
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

export const PrivateTaskQueries = [getPrivateTask, myTasks, currentTasks, doneTasks]