import { shield } from 'graphql-shield'
import { EventMutationPermissions, EventQueryPermissions } from '../events/event.permissions'
import { UserMutationPermissions, UserQueryPermissions } from '../users/user.permissions'
import { GuestMutationPermissions, GuestQueryPermissions } from '../guests/guest.permissions'

export const permissions = shield({
  Query: {
    ...EventQueryPermissions,
    ...UserQueryPermissions,
    ...GuestQueryPermissions
  },

  Mutation: {
    ...EventMutationPermissions,
    ...UserMutationPermissions,
    ...GuestMutationPermissions
  },
}, {
  allowExternalErrors: true
})