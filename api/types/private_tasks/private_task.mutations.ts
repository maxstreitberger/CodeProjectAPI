import { booleanArg, idArg, mutationField, stringArg } from "@nexus/schema"

const createPrivateTask = mutationField('createPrivateTask', {
  type: 'PrivateTask',
  args: {
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.private_tasks.create({
      data: {
        title: args.title,
        description: args.description,
        deadline: new Date(args.deadline),
        created_by: {
          connect: {
            user_id: user.user_id
          }
        }
      }
    })
  }
})

const updatePrivateTask = mutationField('updatePrivateTask', {
  type: 'PrivateTask',
  args: {
    private_task_id: idArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: true }),
    done: booleanArg({ required: false })
  },
  resolve(_root, args, { db }) {
    return db.private_tasks.update({
      where: {
        private_task_id: args.private_task_id
      },
      data: {
        ...args,
        deadline: new Date(args.deadline)
      }
    })
  }
})

const deletePrivateTask = mutationField('deletePrivateTask', {
  type: 'PrivateTask',
  args: {
    private_task_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.private_tasks.delete({ 
      where: {
        private_task_id: args.private_task_id
      } 
    })
  }
})

export const PrivateTaskMutations = [createPrivateTask, updatePrivateTask, deletePrivateTask]