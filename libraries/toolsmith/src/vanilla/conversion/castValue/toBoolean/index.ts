import includes from "../../../array/includes/index.ts"
import pipe from "../../../combinator/pipe/index.ts"
import and from "../../../logic/and/index.ts"
import toLower from "../../../string/toCase/toLower/index.ts"
import trim from "../../../string/trim/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isFinite from "../../../validation/isFinite/index.ts"
import isNonEmptyString from "../../../validation/isNonEmptyString/index.ts"
import isNonZero from "../../../validation/isNonZero/index.ts"
import isNullish from "../../../validation/isNullish/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isString from "../../../validation/isString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toBoolean(value: unknown): boolean {
	// Handle nullish values
	if (isNullish(value)) {
		return false
	}

	// If already boolean, return as-is
	if (isBoolean(value)) {
		return value
	}

	// Handle string representations
	if (isString(value)) {
		const normalized = pipe([
			toLower,
			trim,
		])(value)

		// Explicit true values
		if (includes(normalized)(["true", "yes", "y", "1", "on"])) {
			return true
		}

		// Explicit false values
		if (includes(normalized)(["false", "no", "n", "0", "off"])) {
			return false
		}

		// Empty string is false, all others are true
		return isNonEmptyString(value)
	}

	// Handle numbers: only finite non-zero numbers are true
	if (isNumber(value)) {
		return and(isFinite(value))(isNonZero(value))
	}

	// Objects, arrays, functions, etc. are truthy
	return true
}
