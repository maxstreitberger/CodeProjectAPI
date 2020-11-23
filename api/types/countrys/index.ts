import { CountryMutations } from "./country.mutation";
import { CountryQueries } from "./country.queries";
import { Country } from "./country.type";

export const CountrySchema = [Country, CountryQueries, CountryMutations]