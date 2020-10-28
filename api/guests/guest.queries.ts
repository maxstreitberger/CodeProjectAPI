import { queryField } from '@nexus/schema'

export const GuestQueries = queryField('allGuests', {
  type: "Guest",
  resolve(_root, _args, { db }) {
    return db.user_Event.findMany()
  }
})