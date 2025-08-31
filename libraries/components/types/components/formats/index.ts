import postalCodes from "../../../../../docs/static/json/postalCodes/index.json" with {
	type: "json",
}

export type CountryCode = keyof typeof postalCodes

export type PostalCode = {
	countryCode: CountryCode
	pattern: string
	description: string
}
