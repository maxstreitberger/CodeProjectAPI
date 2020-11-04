import { idArg, queryField } from '@nexus/schema'

const allEventTasks = queryField('allTasks', {
  type: 'EventTask',
  list: true,
  resolve(_too, _args, { db }) {
    return db.eventTask.findMany()
  }
})

const getEventTask = queryField('getTask', {
  type: 'EventTask',
  args: {
    event_task_id: idArg({ required: true })
  },
  list: true,
  resolve(_root, args, { db }) {
    return db.eventTask.findMany({ 
      where: {
        event_task_id: args.event_task_id
      } 
    })
  }
})

export const EventTaskQueries = [allEventTasks, getEventTask]