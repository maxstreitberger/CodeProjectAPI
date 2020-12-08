import { booleanArg, idArg, mutationField, stringArg } from "@nexus/schema"
import { AuthenticationError } from "apollo-server"
import xss from 'xss'

const createEventTask = mutationField('createEventTask', {
  type: 'EventTask',
  args: {
    event_id: idArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: true })
  },
  resolve: async (_root, args, { db, user }) => {
    const title = xss(args.title);
    const description = xss(args.description ? args.description : '')
    const deadline = xss(args.deadline)

    const user_events = await db.events.findMany({
      where: {
        host_id: user.user_id
      }
    })
    
    const isInList = Boolean(user_events.find(event => event.event_id == args.event_id))

    if (isInList) {
      return db.event_tasks.create({
        data: {
          title: title,
          description: description,
          deadline: new Date(deadline),
          event: {
            connect: {
              event_id: args.event_id
            }
          },
          created_by: {
            connect: {
              user_id: user.user_id
            }
          }
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const updateEventTask = mutationField('updateEventTask', {
  type: 'EventTask',
  args: {
    event_task_id: idArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: true }),
    done: booleanArg({ required: false })
  },
  resolve: async(_root, args, { db, user }) => {
    const title = xss(args.title);
    const description = xss(args.description ? args.description : '')
    const deadline = xss(args.deadline)

    const user_tasks = await db.event_tasks.findMany({
      where: {
        user_id: user.user_id
      }
    })
    
    const isInList = Boolean(user_tasks.find(task => task.user_id == user.user_id))

    if (isInList) {
      return db.event_tasks.update({
        where: {
          event_task_id: args.event_task_id
        },
        data: {
          title: title,
          description: description,
          deadline: new Date(args.deadline)
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const deleteEventTask = mutationField('deleteEventTask', {
  type: 'EventTask',
  args: {
    event_task_id: idArg({ required: true })
  },
  resolve: async(_root, args, { db, user }) => {
    const user_tasks = await db.event_tasks.findMany({
      where: {
        user_id: user.user_id
      }
    })
    
    const isInList = Boolean(user_tasks.find(task => task.user_id == user.user_id))
    if (isInList) {
      return db.event_tasks.delete({ 
        where: {
          event_task_id: args.event_task_id
        } 
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

export const EventTaskMutations = [createEventTask, updateEventTask, deleteEventTask]