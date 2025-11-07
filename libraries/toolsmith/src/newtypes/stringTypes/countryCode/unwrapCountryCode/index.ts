import type { CountryCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Extracts the underlying string value from a CountryCode
export default function unwrapCountryCode(countryCode: CountryCode): string {
	return countryCode
}
