import { objectType } from '@nexus/schema'
import { db } from '../db'

const User = objectType({
  name: "User",
  definition(t) {
    t.string('user_id')
    t.string('username')
    t.string('first_name')
    t.string('last_name')
    t.string('email')
    t.string('role')
    t.list.field('events', {
      type: "Event",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return await db.user.findOne({ where: { user_id: root.user_id } }).events()
      }
    })
  }
})

const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.field('user', { type: 'User' })
    t.string('token')
  }
}) 

export const UserTypes = [
  AuthPayload,
  User
]