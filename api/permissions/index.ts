import { shield } from 'graphql-shield'
import { EventMutationPermissions, EventQueryPermissions } from '../events/event.permissions'

export const permissions = shield({
  Query: {
    ...EventQueryPermissions
  },

  Mutation: {
    ...EventMutationPermissions
  }
})