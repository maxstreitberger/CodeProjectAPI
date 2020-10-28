import { auth } from './auth'
import { role } from './role'

export const rules = {
  ...auth,
  ...role
}
