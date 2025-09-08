//++ Type guard that checks if a value is an Array using Array.isArray
export default function isArray(value: unknown): value is Array<unknown> {
	return Array.isArray(value)
}

//?? [EXAMPLE] isArray([]) // true
//?? [EXAMPLE] isArray([1, 2, 3]) // true
//?? [EXAMPLE] isArray(new Array(5)) // true
//?? [EXAMPLE] isArray(Array.from("hello")) // true
//?? [EXAMPLE] isArray("string") // false
//?? [EXAMPLE] isArray({ length: 0 }) // false
/*??
 * [EXAMPLE]
 * function processValue(value: unknown) {
 *   if (isArray(value)) {
 *     return value.length  // TypeScript knows it's an array
 *   }
 *   return 0
 * }
 *
 * const mixed = [[1, 2], "array", null, ["a", "b"]]
 * mixed.filter(isArray)  // [[1, 2], ["a", "b"]]
 *
 * const isMatrix = (value: unknown): boolean =>
 *   isArray(value) && value.length > 0 && value.every(isArray)
 *
 * [GOTCHA] Works correctly across different JavaScript realms (iframes, web workers)
 * [GOTCHA] Not fooled by array-like objects, arguments, or NodeLists
 */
