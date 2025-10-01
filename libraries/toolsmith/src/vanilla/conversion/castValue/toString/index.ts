import is from "../../../validation/is/index.ts"
import isBigInt from "../../../validation/isBigInt/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isDate from "../../../validation/isDate/index.ts"
import isError from "../../../validation/isError/index.ts"
import isFunction from "../../../validation/isFunction/index.ts"
import isMap from "../../../validation/isMap/index.ts"
import isNull from "../../../validation/isNull/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isObject from "../../../validation/isObject/index.ts"
import isRegExp from "../../../validation/isRegExp/index.ts"
import isSet from "../../../validation/isSet/index.ts"
import isString from "../../../validation/isString/index.ts"
import isSymbol from "../../../validation/isSymbol/index.ts"
import isUndefined from "../../../validation/isUndefined/index.ts"
import jsonReplacer from "./jsonReplacer/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toString(value: unknown): string {
	// Handle nullish values
	if (isNull(value)) {
		return "null"
	}
	if (isUndefined(value)) {
		return "undefined"
	}

	// If already a string, return as-is
	if (isString(value)) {
		return value
	}

	// Handle primitives
	if (isNumber(value)) {
		// Special handling for -0 to return "0"
		if (is(-0)(value)) {
			return "0"
		}
		return String(value)
	}

	if (isBoolean(value)) {
		return value ? "true" : "false"
	}

	if (isSymbol(value)) {
		return value.toString()
	}

	if (isBigInt(value)) {
		return value.toString()
	}

	// Handle functions
	if (isFunction(value)) {
		return value.toString()
	}

	// Handle objects
	if (isObject(value)) {
		// Special handling for Dates
		if (isDate(value)) {
			return value.toISOString()
		}

		// Special handling for RegExp
		if (isRegExp(value)) {
			return value.toString()
		}

		// Special handling for Errors
		if (isError(value)) {
			return `${value.name}: ${value.message}`
		}

		// Special handling for Map
		if (isMap(value)) {
			try {
				return JSON.stringify({
					dataType: "Map",
					entries: Array.from(value.entries()),
				})
			} catch {
				return "[Map]"
			}
		}

		// Special handling for Set
		if (isSet(value)) {
			try {
				return JSON.stringify({
					dataType: "Set",
					values: Array.from(value.values()),
				})
			} catch {
				return "[Set]"
			}
		}

		// For arrays and plain objects, use JSON.stringify with circular reference handling
		try {
			const seen = new WeakSet()
			return JSON.stringify(value, jsonReplacer(seen))
		} catch {
			// Fallback for any JSON.stringify errors
			return Object.prototype.toString.call(value)
		}
	}

	// Fallback (should never reach here)
	return String(value)
}
