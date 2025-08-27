/**
 * Checks if a value is array-like (has length property and numeric indices)
 *
 * Determines whether a value can be treated like an array for iteration purposes.
 * Array-like objects have a numeric length property and can be indexed with numbers,
 * but may not have array methods. Common examples include strings, arguments objects,
 * NodeLists, and HTMLCollections. This check is useful when working with values that
 * can be converted to arrays using Array.from() or spread syntax.
 *
 * Array-like criteria:
 * - Has a length property that is a non-negative integer
 * - Length is less than Number.MAX_SAFE_INTEGER
 * - Can be indexed (but doesn't verify all indices exist)
 * - Not null or undefined
 * - Includes actual arrays, strings, and array-like objects
 *
 * @param value - The value to check for array-like properties
 * @returns True if the value is array-like, false otherwise
 * @example
 * ```typescript
 * // Arrays and strings
 * isArrayLike([1, 2, 3])  // true
 * isArrayLike("hello")    // true
 * isArrayLike([])         // true
 *
 * // Array-like objects
 * isArrayLike({ length: 0 })  // true
 * isArrayLike({ length: 3, 0: "a", 1: "b", 2: "c" })  // true
 *
 * // Typed arrays
 * isArrayLike(new Uint8Array(10))  // true
 *
 * // Not array-like
 * isArrayLike(null)  // false
 * isArrayLike(42)    // false
 * isArrayLike({})    // false (no length)
 * isArrayLike({ length: -1 })   // false (negative)
 * isArrayLike({ length: NaN })  // false
 *
 * // Converting to array
 * const toArray = <T>(value: unknown): Array<T> =>
 *   isArrayLike(value) ? Array.from(value as ArrayLike<T>) : []
 * toArray("hello")  // ["h", "e", "l", "l", "o"]
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isArrayLike = (value: unknown): value is ArrayLike<unknown> => {
	// Check for null/undefined first
	if (value == null) {
		return false
	}

	// Check if it's an object or string (primitives except string aren't array-like)
	if (
		typeof value !== "object" && typeof value !== "string" &&
		typeof value !== "function"
	) {
		return false
	}

	// Get the length property
	const len = (value as any).length

	// Validate length is a non-negative safe integer
	return typeof len === "number" &&
		len >= 0 &&
		len <= Number.MAX_SAFE_INTEGER &&
		Math.floor(len) === len &&
		!Number.isNaN(len)
}

export default isArrayLike
