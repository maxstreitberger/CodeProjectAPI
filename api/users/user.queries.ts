import { queryField, stringArg } from '@nexus/schema'


const allUsers = queryField('allUsers', {
  type: 'User',
  nullable: false,
  list: true,
  resolve(_root, _args, { db }) {
    return db.user.findMany()
  }
})

const getUser = queryField('getUser', {
  type: 'User',
  args: {
    user_id: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.user.findOne({
      where: {
        user_id: args.user_id
      }
    })
  }
})

export const UserQueries = [allUsers, getUser]
