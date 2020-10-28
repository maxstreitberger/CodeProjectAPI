import { allow, not } from 'graphql-shield'
import { rules } from '../permissions/rules'

export const UserQueryPermissions = {
  allUsers: rules.isAuthenticated
}

export const UserMutationPermissions = {
  login: not(rules.isAuthenticated),
  register: not(rules.isAuthenticated),
  updateUser: rules.isAuthenticated,
  deleteUser: rules.isAuthenticated
}