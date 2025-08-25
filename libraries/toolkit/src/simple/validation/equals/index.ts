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
 * @curried (a) => (b) => boolean
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns True if the values are deeply equal, false otherwise
 * @example
 * ```typescript
 * // Primitive equality
 * equals(5)(5)              // true
 * equals("hello")("hello")  // true
 * equals(true)(true)        // true
 * equals(null)(null)        // true
 * equals(undefined)(undefined) // true
 *
 * // NaN equality (unlike === operator)
 * equals(NaN)(NaN)          // true
 * equals(0/0)(0/0)          // true
 *
 * // +0 and -0 are considered different
 * equals(0)(-0)             // false
 * equals(+0)(-0)            // false
 *
 * // Object equality (deep comparison)
 * equals({ a: 1, b: 2 })({ a: 1, b: 2 })  // true
 * equals({ a: 1, b: 2 })({ b: 2, a: 1 })  // true (order doesn't matter)
 * equals({ a: 1 })({ a: 1, b: 2 })        // false (different keys)
 *
 * // Nested object equality
 * const obj1 = {
 *   user: {
 *     name: "Alice",
 *     age: 30,
 *     address: { city: "NYC" }
 *   }
 * }
 *
 * const obj2 = {
 *   user: {
 *     name: "Alice",
 *     age: 30,
 *     address: { city: "NYC" }
 *   }
 * }
 *
 * equals(obj1)(obj2)  // true
 *
 * // Array equality
 * equals([1, 2, 3])([1, 2, 3])      // true
 * equals([1, 2, 3])([1, 3, 2])      // false (order matters)
 * equals([1, [2, 3]])([1, [2, 3]])  // true (nested arrays)
 *
 * // Mixed nested structures
 * const data1 = {
 *   items: [
 *     { id: 1, tags: ["a", "b"] },
 *     { id: 2, tags: ["c"] }
 *   ],
 *   meta: { count: 2 }
 * }
 *
 * const data2 = {
 *   items: [
 *     { id: 1, tags: ["a", "b"] },
 *     { id: 2, tags: ["c"] }
 *   ],
 *   meta: { count: 2 }
 * }
 *
 * equals(data1)(data2)  // true
 *
 * // Date equality
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-01")
 * const date3 = new Date("2024-01-02")
 *
 * equals(date1)(date2)  // true (same time)
 * equals(date1)(date3)  // false (different time)
 *
 * // RegExp equality
 * equals(/abc/gi)(/abc/gi)    // true (same pattern and flags)
 * equals(/abc/g)(/abc/i)      // false (different flags)
 * equals(/abc/)(/xyz/)        // false (different pattern)
 *
 * // Function equality (reference only)
 * const fn1 = () => 42
 * const fn2 = () => 42
 * const fn3 = fn1
 *
 * equals(fn1)(fn2)  // false (different references)
 * equals(fn1)(fn3)  // true (same reference)
 *
 * // Circular references
 * const circular1: any = { a: 1 }
 * circular1.self = circular1
 *
 * const circular2: any = { a: 1 }
 * circular2.self = circular2
 *
 * equals(circular1)(circular2)  // true (handles circular refs)
 *
 * const circular3: any = { a: 1 }
 * circular3.self = circular3
 * circular3.b = 2
 *
 * equals(circular1)(circular3)  // false (different properties)
 *
 * // Partial application for specific comparisons
 * const isZero = equals(0)
 * isZero(0)     // true
 * isZero(1)     // false
 * isZero(-0)    // false
 *
 * const isEmptyArray = equals([])
 * isEmptyArray([])      // true
 * isEmptyArray([1])     // false
 *
 * const isDefaultConfig = equals({
 *   timeout: 5000,
 *   retries: 3,
 *   debug: false
 * })
 *
 * isDefaultConfig({ timeout: 5000, retries: 3, debug: false })  // true
 * isDefaultConfig({ timeout: 3000, retries: 3, debug: false })  // false
 *
 * // Finding duplicates in arrays
 * const items = [
 *   { id: 1, name: "Apple" },
 *   { id: 2, name: "Banana" },
 *   { id: 1, name: "Apple" },
 *   { id: 3, name: "Cherry" }
 * ]
 *
 * const findDuplicates = <T>(arr: Array<T>): Array<T> => {
 *   const duplicates: Array<T> = []
 *   for (let i = 0; i < arr.length; i++) {
 *     for (let j = i + 1; j < arr.length; j++) {
 *       if (equals(arr[i])(arr[j]) &&
 *           !duplicates.some(equals(arr[i]))) {
 *         duplicates.push(arr[i])
 *       }
 *     }
 *   }
 *   return duplicates
 * }
 *
 * findDuplicates(items)  // [{ id: 1, name: "Apple" }]
 *
 * // Memoization key generation
 * const cache = new Map()
 *
 * const memoize = <T, R>(fn: (arg: T) => R) => (arg: T): R => {
 *   const existing = Array.from(cache.keys()).find(equals(arg))
 *   if (existing !== undefined) {
 *     return cache.get(existing)
 *   }
 *   const result = fn(arg)
 *   cache.set(arg, result)
 *   return result
 * }
 *
 * const expensiveCalc = memoize((obj: any) => {
 *   console.log("Computing...")
 *   return Object.keys(obj).length
 * })
 *
 * expensiveCalc({ a: 1, b: 2 })  // Computing... → 2
 * expensiveCalc({ a: 1, b: 2 })  // 2 (cached, no computing)
 * expensiveCalc({ b: 2, a: 1 })  // 2 (cached, order doesn't matter)
 * ```
 * @property Pure - Always returns the same result for the same inputs
 * @property Recursive - Handles nested structures of any depth
 * @property Curried - Can be partially applied for reusable comparisons
 * @property Safe - Handles circular references without infinite recursion
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
			for (let i = 0; i < x.length; i++) {
				if (!deepEquals(x[i], y[i], seen)) {
					return false
				}
			}
			return true
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
		for (const key of keysX) {
			if (!keysY.includes(key)) {
				return false
			}
			if (!deepEquals(x[key], y[key], seen)) {
				return false
			}
		}

		return true
	}

	// Start comparison with empty seen map
	return deepEquals(a, b, new WeakMap())
}

export default equals
