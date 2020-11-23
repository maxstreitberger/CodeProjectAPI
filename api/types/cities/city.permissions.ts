import { rules } from '../../middleware/permissions/rules'

export const CityQueryPermissions = {
  allCities: rules.isAuthenticated,
  allEventsFromCity: rules.isAuthenticated
} 

export const CityMutationPermissions = {
  createCity: rules.isAdmin,
  deleteCity: rules.isAdmin,
}