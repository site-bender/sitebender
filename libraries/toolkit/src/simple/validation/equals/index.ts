//++ Performs deep equality comparison between two values
export default function equals<T>(a: T) {
	return function compareWith<U>(b: U): boolean {
		// Helper function that tracks visited objects to handle circular references
		const deepEquals = (
			x: unknown,
			y: unknown,
			seen: WeakMap<object, unknown>,
		): boolean => {
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
			if (x === null || x === undefined || y === null || y === undefined) {
				return false
			}

			// Must be objects from here
			if (typeof x !== "object" || typeof y !== "object") {
				return false
			}

			// Check for circular reference
			if (typeof x === "object" && seen.has(x)) {
				return seen.get(x) === y
			}
			if (typeof x === "object") {
				seen.set(x, y as unknown)
			}

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
			const xObj = x as Record<string, unknown>
			const yObj = y as Record<string, unknown>
			const keysX = Object.keys(xObj)
			const keysY = Object.keys(yObj)

			if (keysX.length !== keysY.length) {
				return false
			}

			// Check if all keys exist and values are equal
			return keysX.every((key) =>
				keysY.includes(key) && deepEquals(xObj[key], yObj[key], seen)
			)
		}

		// Start comparison with empty seen map
		return deepEquals(a, b, new WeakMap<object, unknown>())
	}
}

//?? [EXAMPLE] equals(5)(5) // true
//?? [EXAMPLE] equals("hello")("world") // false
//?? [EXAMPLE] equals(NaN)(NaN) // true (special handling)
//?? [EXAMPLE] equals(0)(-0) // false (+0 and -0 differ)
//?? [EXAMPLE] equals([1, 2, 3])([1, 2, 3]) // true
//?? [EXAMPLE] equals({ a: 1, b: 2 })({ a: 1, b: 2 }) // true
/*??
 * [EXAMPLE]
 * const isZero = equals(0)
 * isZero(0)   // true
 * isZero(-0)  // false (+0 and -0 are different)
 *
 * const hasSameShape = equals({ x: 1, y: 2 })
 * hasSameShape({ x: 1, y: 2 })  // true
 * hasSameShape({ y: 2, x: 1 })  // true (order doesn't matter)
 * hasSameShape({ x: 1 })        // false (missing y)
 *
 * // Handles circular references
 * const obj1 = { a: 1 }
 * obj1.self = obj1
 * const obj2 = { a: 1 }
 * obj2.self = obj2
 * equals(obj1)(obj2)  // true
 *
 * [GOTCHA] Functions are compared by reference only
 * [GOTCHA] +0 and -0 are considered different
 * [GOTCHA] NaN equals NaN (unlike === operator)
 */
