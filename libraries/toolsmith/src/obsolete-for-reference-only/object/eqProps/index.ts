import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const eqProps = <K extends string | symbol>(
	prop: K,
) =>
<T extends Record<string | symbol, Value>>(
	obj1: T,
) =>
<U extends Record<string | symbol, Value>>(
	obj2: U,
): boolean => {
	// Get the values to compare
	const val1 = obj1?.[prop]
	const val2 = obj2?.[prop]

	// Deep equality comparison function
	const deepEqual = (a: Value, b: Value): boolean => {
		// Same reference
		if (a === b) return true

		// Handle NaN special case
		if (
			typeof a === "number" && typeof b === "number" &&
			isNaN(a) && isNaN(b)
		) return true

		// Different types
		if (typeof a !== typeof b) return false

		// Null or undefined (already handled by === above if both are same)
		if (isNullish(a) || isNullish(b)) return false

		// Primitives (already handled by === above if equal)
		if (typeof a !== "object" || typeof b !== "object") return false

		// Date comparison
		if (a instanceof Date && b instanceof Date) {
			return a.getTime() === b.getTime()
		}

		// RegExp comparison
		if (a instanceof RegExp && b instanceof RegExp) {
			return a.source === b.source && a.flags === b.flags
		}

		// Array comparison
		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) return false
			return a.every((item, index) => deepEqual(item, b[index]))
		}

		// Set comparison
		if (a instanceof Set && b instanceof Set) {
			if (a.size !== b.size) return false
			return Array.from(a).every((item) => b.has(item))
		}

		// Map comparison
		if (a instanceof Map && b instanceof Map) {
			if (a.size !== b.size) return false
			return Array.from(a.entries()).every(([key, value]) =>
				b.has(key) && deepEqual(value, b.get(key))
			)
		}

		// Object comparison
		const aKeys = [...Object.keys(a), ...Object.getOwnPropertySymbols(a)]
		const bKeys = [...Object.keys(b), ...Object.getOwnPropertySymbols(b)]

		if (aKeys.length !== bKeys.length) return false

		return aKeys.every((key) => {
			if (!(key in b)) return false
			return deepEqual(
				(a as Record<string | symbol, Value>)[key],
				(b as Record<string | symbol, Value>)[key],
			)
		})
	}

	return deepEqual(val1, val2)
}

export default eqProps
