import { objectType } from '@nexus/schema'

export const Guest = objectType({
  name: "Guest",
  definition(t) {
    t.field('event', {
      type: "Event",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        console.log('Event Root: ') 
        console.log(root)
        //@ts-ignore
        return root.event || (await db.user_Event.findOne({ where: { event_id_user_id: { event_id: root.event_id, user_id: root.user_id } } }).event())
      }
    })
    t.field('guest', {
      type: "User",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        console.log('User Root: ')
        console.log(root)
        //@ts-ignore
        return root.user || (await db.user_Event.findOne({ where: { event_id_user_id: { event_id: root.event_id, user_id: root.user_id } } }).user())
      }
    })
  }
})