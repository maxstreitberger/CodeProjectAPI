import { idArg, queryField } from '@nexus/schema'

const getEventTask = queryField('getEventTask', {
  type: 'EventTask',
  args: {
    event_task_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.event_tasks.findOne({ 
      where: {
        event_task_id: args.event_task_id
      } 
    })
  }
})

const allTasksOfEvent = queryField('allTasksOfEvent', {
  type: "EventTask",
  nullable: false,
  list: true,
  args: {
    event_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.event_tasks.findMany({
      where: {
        event_id: args.event_id
      }
    })
  }
})

export const EventTaskQueries = [getEventTask, allTasksOfEvent]