import { mutationField, stringArg } from "@nexus/schema"

const createPrivateTask = mutationField('createPrivateTask', {
  type: 'PrivateTask',
  args: {
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: false })
  },
  resolve(_root, args, { db, user }) {
    return db.privateTask.create({
      data: {
        title: args.title,
        description: args.description,
        deadline: args.deadline,
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
    private_task_id: stringArg({ required: true }),
    title: stringArg({ required: false }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: false })
  },
  resolve(_root, args, { db }) {
    return db.privateTask.update({
      where: {
        private_task_id: args.private_task_id
      },
      data: {
        ...args
      }
    })
  }
})

const deletePrivateTask = mutationField('deletePrivateTask', {
  type: 'PrivateTask',
  args: {
    private_task_id: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.privateTask.delete({ 
      where: {
        private_task_id: args.private_task_id
      } 
    })
  }
})

export const PrivateTaskMutations = [createPrivateTask, updatePrivateTask, deletePrivateTask]