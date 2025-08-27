import type { Value } from "../../../types/index.ts"

/**
 * Checks if a property satisfies a predicate function
 *
 * Returns true if the specified property of an object satisfies the given
 * predicate function. The predicate receives the property value. Returns
 * false if the property doesn't exist or doesn't satisfy the predicate.
 * Useful for complex property validation and filtering.
 *
 * @param predicate - Function to test the property value
 * @param key - The property key to test
 * @param obj - The object to test
 * @returns True if predicate(obj[key]) returns true, false otherwise
 * @example
 * ```typescript
 * // Basic predicate checks
 * propSatisfies((x: number) => x > 10)("age")({ age: 25 })        // true
 * propSatisfies((x: number) => x > 10)("age")({ age: 5 })         // false
 * propSatisfies((x: number) => x > 10)("age")({})                 // false (missing)
 *
 * // Filtering valid records
 * const isAdult = propSatisfies((age: number) => age >= 18)("age")
 * const users = [{ name: "Alice", age: 25 }, { name: "Bob", age: 17 }]
 * users.filter(isAdult)  // [{ name: "Alice", age: 25 }]
 *
 * // String pattern validation
 * const hasValidEmail = propSatisfies((email: string) =>
 *   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 * )("email")
 * hasValidEmail({ email: "user@example.com" })  // true
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 * @predicate
 */
const propSatisfies = <V extends Value>(
	predicate: (value: V) => boolean,
) =>
<K extends string | symbol>(
	key: K,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined objects
	if (obj == null) {
		return false
	}

	// Check if property exists
	if (!Object.prototype.hasOwnProperty.call(obj, key as string | symbol)) {
		return false
	}

	// Test the property value with the predicate
	try {
		return predicate(obj[key] as V)
	} catch {
		// If predicate throws, return false
		return false
	}
}

export default propSatisfies
