import { queryField } from '@nexus/schema'

const allFriends = queryField('allFriends', {
  type: "Friend",
  list: true,
  resolve(_root, _args, { db }) {
    return db.friend.findMany()
  }
})

export const FriendQueries = [allFriends]