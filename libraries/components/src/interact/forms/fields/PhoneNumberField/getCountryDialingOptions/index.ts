import { COUNTRY_AND_DIALING_CODES } from "@sitebender/toolkit/constants/dialing-codes/index.ts"

import type {
	Country,
	CountryDialingOption,
} from "../../../../../../types/components/forms/index.ts"

import map from "../../../../../helpers/map/index.ts"
import pipe from "../../../../../helpers/pipe/index.ts"
import sort from "../../../../../helpers/sort/index.ts"
import byCountryName from "./byCountryName/index.ts"
import toCountryDialingOption from "./toCountryDialingOption/index.ts"

const getCountryDialingOptions = (): Array<CountryDialingOption> => {
	const sortCountries = sort<Country>(byCountryName)
	const mapToOptions = map<Country, CountryDialingOption>(
		toCountryDialingOption,
	)

	// Fix: Pass the functions as individual arguments, not as an array
	return pipe<Array<Country>, Array<CountryDialingOption>>([
		sortCountries,
		mapToOptions,
	])(COUNTRY_AND_DIALING_CODES)
}

export default getCountryDialingOptions
