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
 * // True arrays are array-like
 * isArrayLike([1, 2, 3])              // true
 * isArrayLike([])                     // true
 * isArrayLike(new Array(5))           // true
 *
 * // Strings are array-like
 * isArrayLike("hello")                // true
 * isArrayLike("")                     // true
 * isArrayLike(new String("test"))     // true
 *
 * // Arguments object is array-like
 * function testArgs() {
 *   return isArrayLike(arguments)
 * }
 * testArgs(1, 2, 3)                   // true
 *
 * // DOM collections are array-like
 * const nodeList = document.querySelectorAll("div")
 * isArrayLike(nodeList)               // true
 *
 * const htmlCollection = document.getElementsByTagName("p")
 * isArrayLike(htmlCollection)         // true
 *
 * // Array-like objects
 * isArrayLike({ length: 0 })          // true
 * isArrayLike({ length: 3, 0: "a", 1: "b", 2: "c" }) // true
 * isArrayLike({ 0: "a", 1: "b", length: 2 })         // true
 *
 * // Typed arrays are array-like
 * isArrayLike(new Uint8Array(10))     // true
 * isArrayLike(new Int32Array([1, 2])) // true
 * isArrayLike(new Float64Array(5))    // true
 *
 * // Not array-like
 * isArrayLike(null)                   // false
 * isArrayLike(undefined)              // false
 * isArrayLike(42)                     // false
 * isArrayLike(true)                   // false
 * isArrayLike({})                     // false (no length)
 * isArrayLike({ size: 3 })            // false (size, not length)
 * isArrayLike(new Set([1, 2, 3]))     // false (has size, not length)
 * isArrayLike(new Map())              // false
 *
 * // Invalid length values
 * isArrayLike({ length: -1 })         // false (negative)
 * isArrayLike({ length: 3.5 })        // false (non-integer)
 * isArrayLike({ length: "3" })        // false (non-number)
 * isArrayLike({ length: NaN })        // false
 * isArrayLike({ length: Infinity })   // false
 * isArrayLike({ length: Number.MAX_SAFE_INTEGER + 1 }) // false
 *
 * // Converting array-like to array
 * function toArray<T>(value: unknown): Array<T> {
 *   if (isArrayLike(value)) {
 *     return Array.from(value as ArrayLike<T>)
 *   }
 *   return []
 * }
 *
 * toArray("hello")                    // ["h", "e", "l", "l", "o"]
 * toArray({ length: 3, 0: "a", 1: "b", 2: "c" }) // ["a", "b", "c"]
 * toArray(document.querySelectorAll("div"))      // [div, div, ...]
 * toArray(42)                         // []
 *
 * // Safe iteration helper
 * function forEach<T>(
 *   value: unknown,
 *   callback: (item: T, index: number) => void
 * ): void {
 *   if (isArrayLike(value)) {
 *     const arrayLike = value as ArrayLike<T>
 *     for (let i = 0; i < arrayLike.length; i++) {
 *       callback(arrayLike[i], i)
 *     }
 *   }
 * }
 *
 * forEach("abc", (char, i) => console.log(i, char))
 * // 0 "a"
 * // 1 "b"
 * // 2 "c"
 *
 * // Sparse array-like objects
 * const sparse = { length: 5, 0: "a", 4: "e" }
 * isArrayLike(sparse)                 // true
 * Array.from(sparse)                  // ["a", undefined, undefined, undefined, "e"]
 *
 * // jQuery objects (if jQuery is present)
 * const $elements = $(".my-class")
 * isArrayLike($elements)              // true
 *
 * // Custom iterable check
 * function isIterable(value: unknown): boolean {
 *   return isArrayLike(value) ||
 *          (value != null && typeof value[Symbol.iterator] === "function")
 * }
 *
 * isIterable([1, 2, 3])               // true (array-like)
 * isIterable("hello")                 // true (array-like)
 * isIterable(new Set([1, 2]))         // true (has iterator)
 * isIterable(new Map())               // true (has iterator)
 * isIterable({})                      // false
 *
 * // Slice implementation for array-likes
 * function slice<T>(
 *   value: unknown,
 *   start?: number,
 *   end?: number
 * ): Array<T> {
 *   if (isArrayLike(value)) {
 *     return Array.prototype.slice.call(value, start, end)
 *   }
 *   return []
 * }
 *
 * slice("hello", 1, 4)                // ["e", "l", "l"]
 * slice([1, 2, 3, 4, 5], 2)          // [3, 4, 5]
 *
 * // Map for array-likes
 * function mapArrayLike<T, R>(
 *   value: unknown,
 *   fn: (item: T, index: number) => R
 * ): Array<R> {
 *   if (isArrayLike(value)) {
 *     return Array.prototype.map.call(value, fn)
 *   }
 *   return []
 * }
 *
 * mapArrayLike("abc", char => char.toUpperCase())
 * // ["A", "B", "C"]
 *
 * // Length validation
 * function hasLength(value: unknown, len: number): boolean {
 *   return isArrayLike(value) &&
 *          (value as ArrayLike<unknown>).length === len
 * }
 *
 * hasLength([1, 2, 3], 3)             // true
 * hasLength("hello", 5)               // true
 * hasLength({ length: 0 }, 0)         // true
 * hasLength(null, 0)                  // false
 *
 * // React children handling
 * function countChildren(children: unknown): number {
 *   if (isArrayLike(children)) {
 *     return (children as ArrayLike<unknown>).length
 *   }
 *   return children == null ? 0 : 1
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Structural - Checks shape, not type or prototype
 * @property Inclusive - Accepts arrays, strings, and array-like objects
 * @property Safe - Validates length is a safe, non-negative integer
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
