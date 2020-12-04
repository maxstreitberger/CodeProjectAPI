import { idArg, mutationField, stringArg } from "@nexus/schema";

const joinEvent = mutationField('joinEvent', {
  type: 'Boolean',
  args: {
    event_id: idArg({ required: true })
  },
  resolve: async (_root, args, { db, user }) => {
    try {
      await db.user_event.create({
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
      return true
    } catch(err) {
      console.log(err)
      return false
    }
  }
})

const leaveEvent = mutationField('leaveEvent', {
  type: 'Boolean',
  args: {
    event_id: idArg({ required: true })
  },
  resolve: async (_root, args, { db, user }) => {
    try {
      await db.user_event.delete({
        where: {
          event_id_user_id: {
            event_id: args.event_id, 
            user_id: user.user_id
          }
        }
      })
      return true
    } catch(err) {
      console.log(err)
      return false
    }
  }
})

export const GuestMutations = [joinEvent, leaveEvent]
