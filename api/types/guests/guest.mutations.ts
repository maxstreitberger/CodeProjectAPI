import { idArg, mutationField, stringArg } from "@nexus/schema";

const joinEvent = mutationField('joinEvent', {
  type: 'Guest',
  args: {
    event_id: idArg({ required: true })
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

const leaveEvent = mutationField('leaveEvent', {
  type: 'Guest',
  args: {
    event_id: idArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.user_Event.delete({
      where: {
        event_id_user_id: {
          event_id: args.event_id, 
          user_id: user.user_id
        }
      }
    })
  }
})

export const GuestMutations = [joinEvent, leaveEvent]
