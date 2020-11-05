import { rules } from '../../middleware/permissions/rules'

export const EventTaskQueryPermissions = { 
  allTasks: rules.isAdmin,
  getTask: rules.isAuthenticated
}

export const EventTaskMutationPermissions = {
  createEventTask: rules.isAuthenticated,
  updateEventTask: rules.isAuthenticated,
  deleteEventTask: rules.isAuthenticated,
}