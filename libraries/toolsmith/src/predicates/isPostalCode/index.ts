import type { PostalCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid international postal code
//++ Validates 3-10 alphanumeric characters with optional spaces and hyphens
//++ Works for UK (SW1A 1AA), Canada (K1A 0B1), Germany (10115), Japan (100-0001), etc.
export default function isPostalCode(value: unknown): value is PostalCode {
	if (typeof value !== "string") {
		return false
	}

	const trimmed = value.trim()

	if (trimmed.length < 3 || trimmed.length > 10) {
		return false
	}

	//++ [EXCEPTION] Using regex for international postal code validation
	return /^[A-Z0-9\s-]+$/i.test(trimmed)
}
