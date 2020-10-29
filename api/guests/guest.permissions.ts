import { rules } from '../permissions/rules'

export const GuestQueryPermissions = {
  allGuests: rules.isAdmin
}

export const GuestMutationPermissions = {
  joinEvent: rules.isAuthenticated,
  leaveEvent: rules.isAuthenticated
}
