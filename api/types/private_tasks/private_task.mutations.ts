import { booleanArg, idArg, mutationField, stringArg } from "@nexus/schema"
import { AuthenticationError } from "apollo-server"
import xss from "xss";

const createPrivateTask = mutationField('createPrivateTask', {
  type: 'PrivateTask',
  args: {
    title: stringArg({ required: true }),
    description: stringArg({ required: false }),
    deadline: stringArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    const title = xss(args.title);
    const description = xss(args.description ? args.description : '')
    const deadline = xss(args.deadline)

    return db.private_tasks.create({
      data: {
        title: title,
        description: description,
        deadline: new Date(deadline),
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
  resolve: async(_root, args, { db, user }) => {
    const title = xss(args.title);
    const description = xss(args.description ? args.description : '')
    const deadline = xss(args.deadline)

    const task = await db.private_tasks.findOne({
      where: {
        private_task_id: args.private_task_id,
      }
    })

    if (user.user_id == task?.user_id) {
      return db.private_tasks.update({
        where: {
          private_task_id: args.private_task_id
        },
        data: {
          title: title,
          description: description,
          deadline: new Date(deadline)
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const deletePrivateTask = mutationField('deletePrivateTask', {
  type: 'PrivateTask',
  args: {
    private_task_id: idArg({ required: true })
  },
  resolve: async(_root, args, { db, user }) => {
    const task = await db.private_tasks.findOne({
      where: {
        private_task_id: args.private_task_id,
      }
    })

    if (user.user_id == task?.user_id) {
      return db.private_tasks.delete({ 
        where: {
          private_task_id: args.private_task_id,
        } 
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

export const PrivateTaskMutations = [createPrivateTask, updatePrivateTask, deletePrivateTask]