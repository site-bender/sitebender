import not from "../../logic/not/index.ts"
import truncate from "../../math/truncate/index.ts"
import contains from "../../string/contains/index.ts"
import isEmpty from "../../string/isEmpty/index.ts"
import slice from "../../string/slice/index.ts"
import startsWith from "../../string/startsWith/index.ts"
import trim from "../../string/trim/index.ts"
import allPass from "../../validation/allPass/index.ts"
import anyPass from "../../validation/anyPass/index.ts"
import gt from "../../validation/gt/index.ts"
import isBoolean from "../../validation/isBoolean/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import isFinite from "../../validation/isFinite/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import isNaN from "../../validation/isNaN/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import isString from "../../validation/isString/index.ts"
import lt from "../../validation/lt/index.ts"
import toString from "../castValue/toString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function safeParseInt(
	radix: number = 10,
): (value: unknown) => number | null {
	return function safeParseIntInner(value: unknown): number | null {
		// Validate radix
		if (anyPass([lt(2), gt(36), not(isInteger)])(radix)) {
			return null
		}

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
			// Return null for NaN or Infinity
			if (not(isFinite(value))) {
				return null
			}
			// Truncate to integer
			return truncate(value)
		}

		// Handle strings
		if (isString(value)) {
			// Trim whitespace
			const trimmed = trim(value) // Check for empty string
			if (isEmpty(trimmed)) {
				return null
			}

			// For radix 10, check if string contains decimal point
			// This ensures strict integer parsing (no decimals allowed in strings)
			function hasDecimalPoint() {
				return contains(".")(trimmed)
			}
			if (allPass([isEqual(10), hasDecimalPoint])(radix)) {
				return null
			}

			// Parse the integer with the specified radix
			const parsed = parseInt(trimmed, radix)

			// Return null if parsing resulted in NaN
			if (isNaN(parsed)) {
				return null
			}

			// Verify that the parsed value when converted back matches
			// This catches cases like "123abc" which parseInt would parse as 123
			// For radix 10, we do a stricter check
			if (isEqual(10)(radix)) {
				// Check if the string represents a valid integer
				const normalizedInput = startsWith("+")(trimmed)
					? slice(1)()(trimmed)
					: trimmed
				const stringifiedParsed = toString(parsed)

				if (isEqual(normalizedInput)(stringifiedParsed)) {
					return parsed
				}

				// Check for leading zeros which are valid
				if (!/^[+-]?0*\d+$/.test(trimmed)) {
					return null
				}
			}

			return parsed
		}

		// All other types return null
		return null
	}
}
