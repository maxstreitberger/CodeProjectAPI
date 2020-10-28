import { mutationField, stringArg } from "@nexus/schema";

export const GuestMutations = mutationField('joinEvent', {
  type: 'Guest',
  args: {
    event_id: stringArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.user_Event.create({
      data: {
        event: {
          connect: {            
            event_id: args.event_id
          }
        },

        user: {
          connect: {
            user_id: user.user_id
          }
        }
      }
    })
  }
})
