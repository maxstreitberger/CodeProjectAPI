import { CityMutations } from './city.mutations'
import { CityQueries } from './city.queries'
import { City } from './city.type' 

export const CitySchema = [City, CityQueries, CityMutations]