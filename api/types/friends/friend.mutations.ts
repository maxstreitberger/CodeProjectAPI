import { idArg, mutationField, stringArg } from '@nexus/schema'

const follow = mutationField('follow', {
  type: "Friend",
  args: {
    friend_id: idArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.friends.create({
      data: {
        friend: {
          connect: {
            user_id: args.friend_id
          }
        },

        following_user: {
          connect: {
            user_id: user.user_id
          }
        }
      }
    })
  }
})

const unfollow = mutationField('unfollow', {
  type: "Friend",
  args: {
    friend_id: idArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.friends.delete({
      where: {
        friend_id_following_user_id: {
          friend_id: args.friend_id,
          following_user_id: user.user_id
        }
      }, 
      include: {
        friend: {},
        following_user: {}
      }
    })
  }
})

export const FriendMutations = [follow, unfollow]