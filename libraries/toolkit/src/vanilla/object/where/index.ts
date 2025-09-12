import type { Value } from "../../../types/index.ts"

import isEmpty from "../../validation/isEmpty/index.ts"

/**
 * Checks if an object satisfies a specification of predicates
 *
 * Tests whether an object satisfies a specification object where each property
 * is a predicate function. Returns true only if all predicates return true for
 * their corresponding properties in the test object. Missing properties fail
 * their predicates unless the predicate explicitly handles undefined.
 *
 * @pure
 * @immutable
 * @curried
 * @predicate
 * @param spec - Object mapping keys to predicate functions
 * @param obj - The object to test
 * @returns True if all predicates are satisfied, false otherwise
 * @example
 * // Basic predicate checking
 * const spec = {
 *   age: (x: number) => x >= 18,
 *   name: (x: string) => x.length > 0
 * }
 * where(spec)({ age: 25, name: "Alice" })         // true
 * where(spec)({ age: 16, name: "Bob" })           // false
 *
 * // Multiple predicates must all pass
 * const isPositive = where({
 *   x: (n: number) => n > 0,
 *   y: (n: number) => n > 0
 * })
 * isPositive({ x: 10, y: 20 })                    // true
 * isPositive({ x: 10, y: -5 })                    // false
 *
 * // Missing properties fail predicates
 * const hasRequired = where({
 *   id: (x: unknown) => x !== undefined
 * })
 * hasRequired({ id: 1 })                          // true
 * hasRequired({ name: "test" })                   // false
 *
 * // User validation example
 * const isValidUser = where({
 *   age: (a: number) => a >= 18 && a <= 120,
 *   email: (e: string) => e.includes("@")
 * })
 * isValidUser({ age: 25, email: "user@ex.com" })  // true
 *
 * // Filtering arrays
 * const items = [
 *   { price: 50, inStock: true },
 *   { price: 150, inStock: false }
 * ]
 * const isAffordable = where({
 *   price: (p: number) => p <= 100,
 *   inStock: (s: boolean) => s === true
 * })
 * items.filter(isAffordable)                      // [{ price: 50, inStock: true }]
 */
const where = <S extends Record<string, (value: unknown) => boolean>>(
	spec: S,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		// Check if any predicates exist
		return isEmpty(spec)
	}

	// Check each predicate in the spec
	return Object.keys(spec).every((key) => {
		const predicate = spec[key]
		const value = obj[key]

		// Run predicate and check result
		try {
			return predicate(value)
		} catch {
			// If predicate throws, consider it failed
			return false
		}
	})
}

export default where
