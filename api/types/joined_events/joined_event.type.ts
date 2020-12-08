import { objectType } from "@nexus/schema"

export const JoinedEvent = objectType({
  name: "JoinedEvent",
  definition(t) {
    t.string('joined_at')
    t.field('event', {
      type: "Event",
      nullable: false,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.event || (await db.user_event.findOne({ where: { event_id_user_id: { event_id: root.event_id, user_id: root.user_id } } }).event())
      }
    })
  }
})