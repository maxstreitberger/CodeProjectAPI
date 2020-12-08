import { rules } from '../../middleware/permissions/rules'

export const CountryQueryPermissions = {
  allCountries: rules.isAuthenticated,
  allCountryEvents: rules.isAuthenticated
} 

export const CountryMutationPermissions = {
  createCountry: rules.isAdmin,
  deleteCountry: rules.isAdmin,
}