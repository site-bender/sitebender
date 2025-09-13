import type {
	Country,
	CountryDialingOption,
} from "../../../../../../types/components/forms/index.ts"

import { COUNTRY_AND_DIALING_CODES } from "../../../../../../../toolkit/src/constants/dialing-codes/index.ts"
import pipe from "../../../../../../../toolkit/src/vanilla/combinator/pipe/index.ts"
import map from "../../../../../helpers/map/index.ts"
import sort from "../../../../../helpers/sort/index.ts"
import byCountryName from "./byCountryName/index.ts"
import toCountryDialingOption from "./toCountryDialingOption/index.ts"

const getCountryDialingOptions = (): Array<CountryDialingOption> => {
	const sortCountries = sort<Country>(byCountryName)
	const mapToOptions = map<Country, CountryDialingOption>(
		toCountryDialingOption,
	)

	// Compose steps with pipe (array-based API)
	return pipe([
		sortCountries,
		mapToOptions,
	])(COUNTRY_AND_DIALING_CODES)
}

export default getCountryDialingOptions
