import not from "../../../logic/not/index.ts"
import truncate from "../../../math/truncate/index.ts"
import isEmpty from "../../../string/isEmpty/index.ts"
import trim from "../../../string/trim/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isFinite from "../../../validation/isFinite/index.ts"
import isNull from "../../../validation/isNull/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isString from "../../../validation/isString/index.ts"
import isUndefined from "../../../validation/isUndefined/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toInteger(value: unknown): number {
	// Handle nullish values
	if (isNull(value)) {
		return 0
	}
	if (isUndefined(value)) {
		return NaN
	}

	// Handle booleans
	if (isBoolean(value)) {
		return value ? 1 : 0
	}

	// Handle numbers (truncate decimals)
	if (isNumber(value)) {
		if (not(isFinite(value))) {
			return NaN
		}
		return truncate(value)
	}

	// Handle strings with strict integer parsing
	if (isString(value)) {
		const trimmed = trim(value)

		// Empty or whitespace-only strings
		if (isEmpty(trimmed)) {
			return NaN
		}

		// Check for valid integer format (optional +/- followed by digits only)
		if (!/^[+-]?\d+$/.test(trimmed)) {
			return NaN
		}

		// Parse as integer
		const parsed = parseInt(trimmed, 10)

		// Additional safety check
		if (not(isFinite(parsed))) {
			return NaN
		}

		return parsed
	}

	// All other types (objects, arrays, functions, symbols) return NaN
	return NaN
}
