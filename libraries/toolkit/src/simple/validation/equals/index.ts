/**
 * Performs deep equality comparison between two values
 *
 * Recursively compares two values for structural equality, checking all nested
 * properties and array elements. Handles circular references, special JavaScript
 * values (NaN, +0/-0), and various object types. This is a curried function that
 * allows partial application for creating specific equality checkers.
 *
 * Equality rules:
 * - Primitives: compared by value (with special handling for NaN and +0/-0)
 * - Objects: compared by structure and values recursively
 * - Arrays: compared by length and element equality in order
 * - Dates: compared by time value
 * - RegExp: compared by source and flags
 * - Functions: compared by reference only
 * - Circular references: handled to prevent infinite recursion
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns True if the values are deeply equal, false otherwise
 * @example
 * ```typescript
 * // Basic equality
 * equals(5)(5)              // true
 * equals("hello")("world")  // false
 * equals(NaN)(NaN)          // true (special handling)
 * equals(0)(-0)             // false (+0 and -0 differ)
 *
 * // Deep object comparison
 * equals({ a: 1, b: 2 })({ a: 1, b: 2 })  // true
 * equals({ a: 1, b: 2 })({ b: 2, a: 1 })  // true
 *
 * // Arrays and nested structures
 * equals([1, 2, 3])([1, 2, 3])      // true
 * equals([1, [2, 3]])([1, [2, 3]])  // true
 *
 * // Partial application
 * const isZero = equals(0)
 * isZero(0)   // true
 * isZero(-0)  // false
 * ```
 */
const equals = <T>(a: T) => <U>(b: U): boolean => {
	// Helper function that tracks visited objects to handle circular references
	const deepEquals = (x: any, y: any, seen: WeakMap<any, any>): boolean => {
		// Handle primitive equality and same reference
		if (x === y) {
			// Check for +0 vs -0 case
			if (x === 0 && y === 0) {
				return 1 / x === 1 / y
			}
			return true
		}

		// Handle NaN equality
		if (typeof x === "number" && typeof y === "number") {
			if (Number.isNaN(x) && Number.isNaN(y)) {
				return true
			}
		}

		// Handle null/undefined
		if (x == null || y == null) {
			return false
		}

		// Must be objects from here
		if (typeof x !== "object" || typeof y !== "object") {
			return false
		}

		// Check for circular reference
		if (seen.has(x)) {
			return seen.get(x) === y
		}
		seen.set(x, y)

		// Handle Dates
		if (x instanceof Date && y instanceof Date) {
			return x.getTime() === y.getTime()
		}

		// Handle RegExp
		if (x instanceof RegExp && y instanceof RegExp) {
			return x.source === y.source && x.flags === y.flags
		}

		// Handle Arrays
		if (Array.isArray(x) && Array.isArray(y)) {
			if (x.length !== y.length) {
				return false
			}
			return x.every((val, i) => deepEquals(val, y[i], seen))
		}

		// Only compare plain objects (not arrays)
		if (Array.isArray(x) || Array.isArray(y)) {
			return false
		}

		// Handle regular objects
		const keysX = Object.keys(x)
		const keysY = Object.keys(y)

		if (keysX.length !== keysY.length) {
			return false
		}

		// Check if all keys exist and values are equal
		return keysX.every((key) =>
			keysY.includes(key) && deepEquals(x[key], y[key], seen)
		)
	}

	// Start comparison with empty seen map
	return deepEquals(a, b, new WeakMap())
}

export default equals
