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
    t.list.field('events', {
      type: "Event",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.events || (await db.user.findOne({ where: { user_id: root.user_id } }).events())
      }
    })
    t.list.field('event_tasks', {
      type: "EventTask",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.event_tasks || (await db.user.findOne({ where: { user_id: root.user_id } }).event_tasks())
      }
    })
    t.list.field('joinedEvents', {
      type: "Event",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.joinedEvents || (await db.user.findOne({ where: { user_id: root.user_id } }).joinedEvents())
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