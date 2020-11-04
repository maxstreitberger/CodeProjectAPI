import { objectType } from '@nexus/schema'

export const Friend = objectType({
  name: "Friend",
  definition(t) {
    t.field('friend', {
      type: "User",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        console.log(root)
        //@ts-ignore
        return root.friend || (await db.friend.findOne({ where: { friend_id_following_user_id: { friend_id: root.friend_id, following_user_id: root.following_user_id } } }).friend())
      }
    })
    t.field('following_user', {
      type: "User",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        console.log(root)
        //@ts-ignore
        return root.following_user || (await db.friend.findOne({ where: { friend_id_following_user_id: { friend_id: root.friend_id, following_user_id: root.following_user_id } } }).following_user())
      }
    })
  }
})
