import { rules } from '../../middleware/permissions/rules'

export const GuestQueryPermissions = {
  allGuestOfTheEvent: rules.isAuthenticated
}

export const GuestMutationPermissions = {
  joinEvent: rules.isAuthenticated,
  leaveEvent: rules.isAuthenticated
}
