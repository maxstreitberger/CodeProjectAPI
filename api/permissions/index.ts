import { shield } from 'graphql-shield'
import { EventMutationPermissions, EventQueryPermissions } from '../events/event.permissions'
import { UserMutationPermissions, UserQueryPermissions } from '../users/user.permissions'
import { GuestMutationPermissions, GuestQueryPermissions } from '../guests/guest.permissions'
import { EventTaskMutationPermissions, EventTaskQueryPermissions } from '../event_tasks/event_task.permissions'
import { PrivateTaskMutationPermissions, PrivateTaskQueryPermissions } from '../private_tasks/private_task.permissions'

export const permissions = shield({
  Query: {
    ...EventQueryPermissions,
    ...UserQueryPermissions,
    ...GuestQueryPermissions,
    ...EventTaskQueryPermissions,
    ...PrivateTaskQueryPermissions
  },

  Mutation: {
    ...EventMutationPermissions,
    ...UserMutationPermissions,
    ...GuestMutationPermissions,
    ...EventTaskMutationPermissions,
    ...PrivateTaskMutationPermissions
  },
}, {
  allowExternalErrors: true
})