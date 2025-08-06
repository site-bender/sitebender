import postalCodes from "../../../static/json/postalCodes/index.json"

export type CountryCode = keyof typeof postalCodes

export type PostalCode = {
	countryCode: CountryCode
	pattern: string
	description: string
}
