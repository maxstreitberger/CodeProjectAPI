import { rules } from '../../middleware/permissions/rules'

export const CityQueryPermissions = {
  allCities: rules.isAuthenticated,
  allCityEvents: rules.isAuthenticated
} 

export const CityMutationPermissions = {
  createCity: rules.isAdmin,
  deleteCity: rules.isAdmin,
}