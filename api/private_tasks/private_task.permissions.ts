import { rules } from '../permissions/rules'

export const PrivateTaskQueryPermissions = { 
  allPrivateTasks: rules.isAdmin,
  getPrivateTask: rules.isAuthenticated
}

export const PrivateTaskMutationPermissions = {
  createPrivateTask: rules.isAuthenticated,
  updatePrivateTask: rules.isAuthenticated,
  deletePrivateTask: rules.isAuthenticated,
}