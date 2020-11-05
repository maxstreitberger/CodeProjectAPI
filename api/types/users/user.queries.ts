import { idArg, queryField, stringArg } from '@nexus/schema'

const me = queryField('me', {
  type: 'User',
  resolve(_root, _args, { db, user }) {
    return db.user.findOne({
      where: {
        user_id: user.user_id
      }
    })
  }
})

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
    user_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.user.findOne({
      where: {
        user_id: args.user_id
      }
    })
  }
})

const myVotes = queryField('myVotes', {
  type: "Vote",
  list: true,
  nullable: false,
  resolve(_root, _args, { db, user }) {
    return db.vote.findMany({
      where: {
        user_id: user.user_id
      }
    })
  }
})

export const UserQueries = [allUsers, getUser, me, myVotes]
