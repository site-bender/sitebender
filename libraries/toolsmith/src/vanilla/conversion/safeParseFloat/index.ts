import isEmpty from "../../string/isEmpty/index.ts"
import trim from "../../string/trim/index.ts"
import isBoolean from "../../validation/isBoolean/index.ts"
import isNaN from "../../validation/isNaN/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import isString from "../../validation/isString/index.ts"
import toFloat from "../castValue/toFloat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function safeParseFloat(value: unknown): number | null {
	// Handle null and undefined
	if (isNullish(value)) {
		return null
	}

	// Handle booleans
	if (isBoolean(value)) {
		return value ? 1 : 0
	}

	// Handle numbers directly
	if (isNumber(value)) {
		// Return null for NaN
		return isNaN(value) ? null : value
	}

	// Handle strings
	if (isString(value)) {
		// Trim whitespace
		const trimmed = trim(value)

		// Check for empty string
		if (isEmpty(trimmed)) {
			return null
		}

		// Parse the number
		const parsed = toFloat(trimmed)

		// Return null if parsing resulted in NaN
		return isNaN(parsed) ? null : parsed
	}

	// All other types return null
	return null
}
