import allPass from "../allPass/index.ts"
import isFunction from "../isFunction/index.ts"
import isInteger from "../isInteger/index.ts"
import isNaN from "../isNaN/index.ts"
import isNull from "../isNull/index.ts"
import isNumber from "../isNumber/index.ts"
import isObject from "../isObject/index.ts"
import isString from "../isString/index.ts"
import isUndefined from "../isUndefined/index.ts"
import either from "../either/index.ts"
import gte from "../gte/index.ts"
import lte from "../lte/index.ts"
import nonePass from "../nonePass/index.ts"

//++ Checks if a value is array-like (has length property and numeric indices)
export default function isArrayLike(
	value: unknown,
): value is ArrayLike<unknown> {
	// Check for null/undefined first
	if (either(isNull)(isUndefined)(value)) {
		return false
	}

	// Check if it's an object or string (primitives except string aren't array-like)
	if (nonePass([isObject, isString, isFunction])(value)) {
		return false
	}

	// Get the length property
	const len = (value as ArrayLike<unknown>).length

	// Validate length is a number first
	if (!isNumber(len)) {
		return false
	}

	// Now we know it's a number, validate it's a non-negative safe integer
	const numLen = len as number
	return allPass([
		gte(0),
		lte(Number.MAX_SAFE_INTEGER),
		isInteger,
		nonePass([isNaN])
	])(numLen)
}

//?? [EXAMPLE] isArrayLike([1, 2, 3]) // true
//?? [EXAMPLE] isArrayLike("hello") // true
//?? [EXAMPLE] isArrayLike({ length: 0 }) // true
//?? [EXAMPLE] isArrayLike({ length: 3, 0: "a", 1: "b", 2: "c" }) // true
//?? [EXAMPLE] isArrayLike(null) // false
//?? [EXAMPLE] isArrayLike(42) // false
//?? [EXAMPLE] isArrayLike({}) // false (no length)
//?? [EXAMPLE] isArrayLike({ length: -1 }) // false (negative)
/*??
 | [EXAMPLE]
 | isArrayLike([1, 2, 3])  // true (actual array)
 | isArrayLike("hello")    // true (string)
 | isArrayLike([])         // true (empty array)
 |
 | isArrayLike({ length: 0 })  // true (array-like object)
 | isArrayLike({ length: 3, 0: "a", 1: "b", 2: "c" })  // true
 |
 | isArrayLike(new Uint8Array(10))  // true (typed array)
 | isArrayLike(document.querySelectorAll("div"))  // true (NodeList)
 |
 | const toArray = <T>(value: unknown): Array<T> =>
 |   isArrayLike(value) ? Array.from(value as ArrayLike<T>) : []
 | toArray("hello")  // ["h", "e", "l", "l", "o"]
 |
 | [GOTCHA] Doesn't verify all indices exist, just that length is valid
 | [GOTCHA] Functions with length property return true (they're array-like)
 |
*/
