import { extendType } from '@nexus/schema'

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allUsers', {
      nullable: false,
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany()
      }
    })
  }
})
