import isNumber from "../isNumber/index.ts"
import isObject from "../isObject/index.ts"
import isDate from "../isDate/index.ts"
import isRegExp from "../isRegExp/index.ts"
import isNull from "../isNull/index.ts"
import isUndefined from "../isUndefined/index.ts"
import or from "../../logic/or/index.ts"
import and from "../../logic/and/index.ts"
import anyPass from "../anyPass/index.ts"
import isArray from "../isArray/index.ts"
import length from "../../array/length/index.ts"
import isUnequal from "../isUnequal/index.ts"
import not from "../../logic/not/index.ts"
import allPass from "../allPass/index.ts"
import every from "../../array/every/index.ts"
import includes from "../../array/includes/index.ts"
import isNaN from "../isNaN/index.ts"
import isZero from "../isZero/index.ts"
import is from "../is/index.ts"
import type { Value } from "../../../types/index.ts"

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
			if (is(x)(y)) {
				return true
			}

			// Check for +0 vs -0 case
			if (and(allPass([isNumber, isZero])(x))(allPass([isNumber, isZero])(y))) {
				return is(x)(y)
			}

			// Handle NaN equality
			if (and(allPass([isNumber, isNaN])(x))(allPass([isNumber, isNaN])(y))) {
				return true
			}

			// Handle null/undefined
			const isNullOrUndefined = anyPass([isNull, isUndefined])
			if (or(isNullOrUndefined(x))(isNullOrUndefined(y))) {
				return false
			}

			// Must be objects from here
			if (or(not(isObject)(x))(not(isObject)(y))) {
				return false
			}

			// Check for circular reference
			if (and(isObject(x))(seen.has(x as object))) {
				return is(seen.get(x as object))(y)
			}
			if (isObject(x)) {
				seen.set(x as object, y as unknown)
			}

			// Handle Dates
			if (and(isDate(x))(isDate(y))) {
				return is((x as Date).getTime())((y as Date).getTime())
			}

			// Handle RegExp
			if (and(isRegExp(x))(isRegExp(y))) {
				return and(is((x as RegExp).source)((y as RegExp).source))(
					is((x as RegExp).flags)((y as RegExp).flags),
				)
			}

			// Handle Arrays
			if (and(isArray(x))(isArray(y))) {
				if (isUnequal(length(x as Array<Value>))(length(y as Array<Value>))) {
					return false
				}
				return every((val: Value, i: number) =>
					deepEquals(val, (y as Array<Value>)[i], seen)
				)(x as Array<Value>)
			}

			// Only compare plain objects (not arrays)
			if (or(isArray(x))(isArray(y))) {
				return false
			}

			// Handle regular objects
			const xObj = x as Record<string, unknown>
			const yObj = y as Record<string, unknown>
			const keysX = Object.keys(xObj)
			const keysY = Object.keys(yObj)

			if (isUnequal(length(keysX))(length(keysY))) {
				return false
			}

			// Check if all keys exist and values are equal
			return every((key: string) =>
				and(includes(key)(keysY))(deepEquals(xObj[key], yObj[key], seen))
			)(keysX)
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
