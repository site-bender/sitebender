//++ Checks if a value is array-like (has length property and numeric indices)
export default function isArrayLike(value: unknown): value is ArrayLike<unknown> {
	// Check for null/undefined first
	if (value === null || value === undefined) {
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
	const len = (value as ArrayLike<unknown>).length

	// Validate length is a non-negative safe integer
	return typeof len === "number" &&
		len >= 0 &&
		len <= Number.MAX_SAFE_INTEGER &&
		Math.floor(len) === len &&
		!Number.isNaN(len)
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
 * [EXAMPLE]
 * isArrayLike([1, 2, 3])  // true (actual array)
 * isArrayLike("hello")    // true (string)
 * isArrayLike([])         // true (empty array)
 *
 * isArrayLike({ length: 0 })  // true (array-like object)
 * isArrayLike({ length: 3, 0: "a", 1: "b", 2: "c" })  // true
 *
 * isArrayLike(new Uint8Array(10))  // true (typed array)
 * isArrayLike(document.querySelectorAll("div"))  // true (NodeList)
 *
 * const toArray = <T>(value: unknown): Array<T> =>
 *   isArrayLike(value) ? Array.from(value as ArrayLike<T>) : []
 * toArray("hello")  // ["h", "e", "l", "l", "o"]
 *
 * [GOTCHA] Doesn't verify all indices exist, just that length is valid
 * [GOTCHA] Functions with length property return true (they're array-like)
 */
