import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Checks if two objects have equal values for a specified property
 *
 * Compares the values of a specific property in two objects using
 * deep equality comparison. Returns true if both values are deeply
 * equal, false otherwise. Handles nested objects, arrays, and special
 * types like Date and RegExp.
 *
 * @pure
 * @curried
 * @predicate
 * @param prop - The property key to compare
 * @param obj1 - The first object
 * @param obj2 - The second object
 * @returns True if the property values are equal, false otherwise
 * @example
 * ```typescript
 * // Basic property comparison
 * eqProps("a")({ a: 1, b: 2 })({ a: 1, c: 3 })    // true
 * eqProps("a")({ a: 1 })({ a: 2 })                // false
 *
 * // Missing properties
 * eqProps("x")({ a: 1 })({ b: 2 })                // true (both undefined)
 * eqProps("x")({ x: null })({ x: undefined })     // false
 *
 * // Deep equality for objects
 * eqProps("data")(
 *   { data: { x: 1, y: 2 } }
 * )(
 *   { data: { x: 1, y: 2 } }
 * ) // true
 *
 * // Array comparison
 * eqProps("items")({ items: [1, 2, 3] })({ items: [1, 2, 3] }) // true
 * eqProps("items")({ items: [1, 2, 3] })({ items: [1, 3, 2] }) // false
 *
 * // Date and RegExp objects
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-01")
 * eqProps("created")({ created: date1 })({ created: date2 }) // true
 * eqProps("pattern")({ pattern: /test/gi })({ pattern: /test/gi }) // true
 *
 * // Partial application for validation
 * const haveSameId = eqProps("id")
 * haveSameId({ id: 1, name: "A" })({ id: 1, name: "B" }) // true
 * haveSameId({ id: 1 })({ id: 2 })                       // false
 * ```
 */
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
