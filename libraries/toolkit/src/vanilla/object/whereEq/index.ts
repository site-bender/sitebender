import type { Value } from "../../../types/index.ts"

import isEmpty from "../../validation/isEmpty/index.ts"

/**
 * Checks if an object satisfies a specification using strict equality
 *
 * Like where, but instead of predicates, uses direct values for comparison
 * with strict equality (===). Returns true only if all specified properties
 * in the test object strictly equal the corresponding values in the spec.
 * Missing properties are considered not equal.
 *
 * @pure
 * @immutable
 * @curried
 * @predicate
 * @param spec - Object mapping keys to expected values
 * @param obj - The object to test
 * @returns True if all properties match their expected values, false otherwise
 * @example
 * // Basic equality checking
 * const spec = { age: 25, name: "Alice" }
 * whereEq(spec)({ age: 25, name: "Alice", city: "NYC" })  // true
 * whereEq(spec)({ age: 26, name: "Alice" })               // false
 *
 * // Partial matching (only checks spec properties)
 * whereEq({ status: "active" })({ id: 1, status: "active" })  // true
 *
 * // Missing properties fail
 * whereEq({ required: "value" })({ other: "data" })       // false
 *
 * // Strict equality (no type coercion)
 * whereEq({ count: 0 })({ count: "0" })                   // false
 * whereEq({ value: null })({ value: undefined })          // false
 *
 * // Array and object reference equality
 * const arr = [1, 2, 3]
 * whereEq({ items: arr })({ items: arr })                 // true (same ref)
 * whereEq({ items: [1, 2, 3] })({ items: [1, 2, 3] })     // false (diff refs)
 *
 * // Filtering arrays by exact values
 * const users = [
 *   { id: 1, role: "admin", active: true },
 *   { id: 2, role: "user", active: true }
 * ]
 * const isActiveAdmin = whereEq({ role: "admin", active: true })
 * users.filter(isActiveAdmin)                             // [{ id: 1, ... }]
 */
const whereEq = <S extends Record<string, Value>>(
	spec: S,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		// Check if spec is empty
		return isEmpty(spec)
	}

	// Check each property in the spec
	return Object.keys(spec).every((key) => obj[key] === spec[key])
}

export default whereEq
