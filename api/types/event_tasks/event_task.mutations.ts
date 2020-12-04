import { booleanArg, idArg, mutationField, stringArg } from "@nexus/schema"

const createEventTask = mutationField('createEventTask', {
  type: 'EventTask',
  args: {
    event_id: idArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.event_tasks.create({
      data: {
        title: args.title,
        description: args.description,
        deadline: new Date(args.deadline),
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

const updateEventTask = mutationField('updateEventTask', {
  type: 'EventTask',
  args: {
    event_task_id: idArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: true }),
    done: booleanArg({ required: false })
  },
  resolve(_root, args, { db }) {
    return db.event_tasks.update({
      where: {
        event_task_id: args.event_task_id
      },
      data: {
        ...args,
        deadline: new Date(args.deadline)
      }
    })
  }
})

const deleteEventTask = mutationField('deleteEventTask', {
  type: 'EventTask',
  args: {
    event_task_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.event_tasks.delete({ 
      where: {
        event_task_id: args.event_task_id
      } 
    })
  }
})

export const EventTaskMutations = [createEventTask, updateEventTask, deleteEventTask]