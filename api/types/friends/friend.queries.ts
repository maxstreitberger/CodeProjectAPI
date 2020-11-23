import { queryField } from '@nexus/schema'

const allFriends = queryField('allFriends', {
  type: "Friend",
  list: true,
  resolve(_root, _args, { db }) {
    return db.friend.findMany()
  }
})

const myFriends = queryField('myFriends', {
  type: "Friend",
  list: true,
  resolve(_root, _args, { db, user }) {
    return db.friend.findMany({
      where: {
        following_user_id: user.user_id
      }
    })
  }
})

export const FriendQueries = [allFriends, myFriends]