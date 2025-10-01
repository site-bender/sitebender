import length from "../../../array/length/index.ts"
import isEmpty from "../../../string/isEmpty/index.ts"
import trim from "../../../string/trim/index.ts"
import isArray from "../../../validation/isArray/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isEqual from "../../../validation/isEqual/index.ts"
import isNull from "../../../validation/isNull/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isString from "../../../validation/isString/index.ts"
import isUndefined from "../../../validation/isUndefined/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toFloat(value: unknown): number {
	// Handle nullish values
	if (isNull(value)) {
		return 0
	}
	if (isUndefined(value)) {
		return NaN
	}

	// If already a number, return as-is
	if (isNumber(value)) {
		return value
	}

	// Handle booleans
	if (isBoolean(value)) {
		return value ? 1 : 0
	}

	// Handle strings
	if (isString(value)) {
		const trimmed = trim(value)

		// Empty or whitespace-only strings become 0
		if (isEmpty(trimmed)) {
			return 0
		}

		// Handle special cases
		if (isEqual("Infinity")(trimmed)) {
			return Infinity
		}
		if (isEqual("-Infinity")(trimmed)) {
			return -Infinity
		}
		if (isEqual("NaN")(trimmed)) {
			return NaN
		}

		// Parse as float
		const parsed = parseFloat(trimmed)
		return parsed
	}

	// Handle single-element arrays
	if (isArray(value)) {
		if (isEqual(1)(length(value))) {
			return toFloat(value[0])
		}
		return NaN
	}

	// All other types (objects, functions, symbols) return NaN
	return NaN
}
