import { shield } from 'graphql-shield'
import { EventMutationPermissions, EventQueryPermissions } from '../events/event.permissions'
import { UserMutationPermissions, UserQueryPermissions } from '../users/user.permissions'

export const permissions = shield({
  Query: {
    ...EventQueryPermissions,
    ...UserQueryPermissions
  },

  Mutation: {
    ...EventMutationPermissions,
    ...UserMutationPermissions
  }
})