import type { CountryCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as CountryCode without validation - use only when input is guaranteed valid
export default function unsafeCountryCode(value: string): CountryCode {
	return value as CountryCode
}
