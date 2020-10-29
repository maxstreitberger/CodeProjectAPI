import { queryField, stringArg } from '@nexus/schema'

const allTasks = queryField('allTasks', {
  type: 'EventTask',
  list: true,
  resolve(_too, _args, { db }) {
    return db.eventTask.findMany()
  }
})

const getTask = queryField('getTask', {
  type: 'EventTask',
  args: {
    task_id: stringArg({ required: true })
  },
  list: true,
  resolve(_root, args, { db }) {
    return db.eventTask.findMany({ 
      where: {
        task_id: args.task_id
      } 
    })
  }
})

export const EventTaskQueries = [allTasks, getTask]