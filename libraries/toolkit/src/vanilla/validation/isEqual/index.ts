import isNumber from "../isNumber/index.ts"
import isObject from "../isObject/index.ts"
import isDate from "../isDate/index.ts"
import isRegExp from "../isRegExp/index.ts"
import isNull from "../isNull/index.ts"
import isUndefined from "../isUndefined/index.ts"
import or from "../../logic/or/index.ts"
import and from "../../logic/and/index.ts"
import anyPass from "../anyPass/index.ts"

//++ Performs deep equality comparison between two values
export default function isEqual<T>(a: T) {
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
			if (and(isNumber(x))(isNumber(y))) {
				if (Number.isNaN(x) && Number.isNaN(y)) {
					return true
				}
			}

			// Handle null/undefined
			const isNullOrUndefined = anyPass([isNull, isUndefined])
			if (isNullOrUndefined(x) || isNullOrUndefined(y)) {
				return false
			}

			// Must be objects from here
			if (or(!isObject(x))(!isObject(y))) {
				return false
			}

			// Check for circular reference
			if (isObject(x) && seen.has(x as object)) {
				return seen.get(x as object) === y
			}
			if (isObject(x)) {
				seen.set(x as object, y as unknown)
			}

			// Handle Dates
			if (and(isDate(x))(isDate(y))) {
				return (x as Date).getTime() === (y as Date).getTime()
			}

			// Handle RegExp
			if (and(isRegExp(x))(isRegExp(y))) {
				return (x as RegExp).source === (y as RegExp).source && (x as RegExp).flags === (y as RegExp).flags
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
 | [EXAMPLE]
 | const isZero = equals(0)
 | isZero(0)   // true
 | isZero(-0)  // false (+0 and -0 are different)
 |
 | const hasSameShape = equals({ x: 1, y: 2 })
 | hasSameShape({ x: 1, y: 2 })  // true
 | hasSameShape({ y: 2, x: 1 })  // true (order doesn't matter)
 | hasSameShape({ x: 1 })        // false (missing y)
 |
 | // Handles circular references
 | const obj1 = { a: 1 }
 | obj1.self = obj1
 | const obj2 = { a: 1 }
 | obj2.self = obj2
 | equals(obj1)(obj2)  // true
 |
 | [GOTCHA] Functions are compared by reference only
 | [GOTCHA] +0 and -0 are considered different
 | [GOTCHA] NaN equals NaN (unlike === operator)
 |
*/
