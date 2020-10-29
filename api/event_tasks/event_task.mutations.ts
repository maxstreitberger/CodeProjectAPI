import { arg, mutationField, stringArg } from "@nexus/schema"

const createTask = mutationField('createTask', {
  type: 'EventTask',
  args: {
    event_id: stringArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: false })
  },
  resolve(_root, args, { db, user }) {
    return db.eventTask.create({
      data: {
        title: args.title,
        description: args.description,
        deadline: args.deadline,
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
  }
})

const updateTask = mutationField('updateTask', {
  type: 'EventTask',
  args: {
    task_id: stringArg({ required: true }),
    title: stringArg({ required: false }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: false })
  },
  resolve(_root, args, { db }) {
    return db.eventTask.update({
      where: {
        task_id: args.task_id
      },
      data: {
        ...args
      }
    })
  }
})

const deleteTask = mutationField('deleteTask', {
  type: 'EventTask',
  args: {
    task_id: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.eventTask.delete({ 
      where: {
        task_id: args.task_id
      } 
    })
  }
})

export const EventTaskMutations = [createTask, updateTask, deleteTask]