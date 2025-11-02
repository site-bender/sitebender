import type {
	Country,
	CountryDialingOption,
} from "../../../../../../../types/architect/forms/index.ts"

const toCountryDialingOption = (country: Country): CountryDialingOption => {
	return {
		value: country.dialingCode,
		label: country.name.length > 16
			? `${country.alpha3} (${country.dialingCode})`
			: `${country.name} (${country.dialingCode})`,
	}
}

export default toCountryDialingOption
