/**
 * Type guard that checks if a value is an Array
 *
 * Uses the native Array.isArray method to reliably determine if a value is an array.
 * This is more reliable than instanceof Array because it works correctly across
 * different JavaScript realms (e.g., iframes, web workers). Returns a type predicate
 * that narrows the type to Array<unknown> in TypeScript.
 *
 * Array detection:
 * - True arrays: created with [], new Array(), Array.from(), etc.
 * - Cross-realm: works with arrays from different contexts
 * - Not fooled by: array-like objects, arguments, NodeLists
 * - Type narrowing: provides TypeScript type guard
 * - No coercion: doesn't convert values, only checks type
 *
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * @example
 * ```typescript
 * // True for arrays
 * isArray([])                    // true
 * isArray([1, 2, 3])            // true
 * isArray(new Array(5))         // true
 * isArray(Array.from("hello"))  // true
 * isArray([undefined])         // true
 *
 * // False for array-like objects
 * isArray("string")             // false (has length and indexing)
 * isArray({ length: 0 })        // false (array-like)
 * isArray({ 0: "a", 1: "b", length: 2 }) // false
 * isArray(arguments)            // false (arguments object)
 * isArray(document.querySelectorAll("div")) // false (NodeList)
 *
 * // False for other types
 * isArray(null)                 // false
 * isArray(undefined)            // false
 * isArray({})                   // false
 * isArray(42)                   // false
 * isArray(true)                 // false
 * isArray(() => {})             // false
 * isArray(new Set([1, 2, 3]))  // false
 * isArray(new Map())            // false
 *
 * // Type narrowing in TypeScript
 * function processValue(value: unknown) {
 *   if (isArray(value)) {
 *     // TypeScript knows value is Array<unknown> here
 *     return value.length
 *   }
 *   return 0
 * }
 *
 * processValue([1, 2, 3])       // 3
 * processValue("hello")         // 0
 * processValue({ length: 5 })   // 0
 *
 * // Filtering mixed collections
 * const mixed = [
 *   [1, 2, 3],
 *   "array",
 *   { items: [] },
 *   null,
 *   ["a", "b"],
 *   new Set([1, 2]),
 *   []
 * ]
 *
 * const arrays = mixed.filter(isArray)
 * // [[1, 2, 3], ["a", "b"], []]
 *
 * // Safe array operations
 * function safeMap<T, R>(
 *   value: unknown,
 *   fn: (item: T) => R
 * ): Array<R> | null {
 *   if (isArray(value)) {
 *     return value.map(fn)
 *   }
 *   return null
 * }
 *
 * safeMap([1, 2, 3], x => x * 2)  // [2, 4, 6]
 * safeMap("not array", x => x)     // null
 *
 * // Nested array checking
 * const data = {
 *   items: [1, 2, 3],
 *   meta: { tags: ["a", "b"] },
 *   invalid: "not-array"
 * }
 *
 * isArray(data.items)           // true
 * isArray(data.meta.tags)       // true
 * isArray(data.invalid)         // false
 * isArray(data.meta)            // false
 *
 * // Matrix/2D array validation
 * function isMatrix(value: unknown): boolean {
 *   return isArray(value) &&
 *          value.length > 0 &&
 *          value.every(isArray)
 * }
 *
 * isMatrix([[1, 2], [3, 4]])    // true
 * isMatrix([1, 2, 3])           // false
 * isMatrix([[1], [2], [3]])     // true
 * isMatrix([])                  // false
 *
 * // Cross-realm safety (works across iframes)
 * const iframe = document.createElement("iframe")
 * document.body.appendChild(iframe)
 * const iframeArray = iframe.contentWindow?.Array
 * const crossRealmArray = new iframeArray(1, 2, 3)
 *
 * isArray(crossRealmArray)      // true (Array.isArray works)
 * crossRealmArray instanceof Array // false (instanceof fails)
 *
 * // Arguments object handling
 * function checkArguments() {
 *   console.log(isArray(arguments))  // false
 *   const args = Array.from(arguments)
 *   console.log(isArray(args))       // true
 * }
 *
 * // Typed array checking
 * isArray(new Int32Array([1, 2, 3]))     // false
 * isArray(new Uint8Array([1, 2, 3]))     // false
 * isArray(Array.from(new Int32Array([1, 2, 3]))) // true
 *
 * // JSON parsing safety
 * function parseJsonArray(json: string): Array<unknown> | null {
 *   try {
 *     const parsed = JSON.parse(json)
 *     return isArray(parsed) ? parsed : null
 *   } catch {
 *     return null
 *   }
 * }
 *
 * parseJsonArray('[1, 2, 3]')   // [1, 2, 3]
 * parseJsonArray('{"a": 1}')    // null
 * parseJsonArray('invalid')     // null
 *
 * // API response validation
 * interface ApiResponse {
 *   data: unknown
 *   status: number
 * }
 *
 * function validateListResponse(response: ApiResponse): Array<unknown> {
 *   if (response.status === 200 && isArray(response.data)) {
 *     return response.data
 *   }
 *   return []
 * }
 *
 * // React children validation
 * function renderList(children: unknown) {
 *   if (isArray(children)) {
 *     return children.map((child, i) =>
 *       <li key={i}>{child}</li>
 *     )
 *   }
 *   return <li>{children}</li>
 * }
 *
 * // Recursive structure validation
 * type NestedArray = Array<number | NestedArray>
 *
 * function flattenDeep(value: unknown): Array<number> {
 *   if (!isArray(value)) return []
 *
 *   const result: Array<number> = []
 *   for (const item of value) {
 *     if (isArray(item)) {
 *       result.push(...flattenDeep(item))
 *     } else if (typeof item === "number") {
 *       result.push(item)
 *     }
 *   }
 *   return result
 * }
 *
 * flattenDeep([1, [2, [3, 4]], 5])  // [1, 2, 3, 4, 5]
 * flattenDeep("not array")          // []
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to Array<unknown>
 * @property Cross-realm - Works correctly across different JavaScript contexts
 * @property Native - Uses built-in Array.isArray for reliability
 */
const isArray = (value: unknown): value is Array<unknown> =>
	Array.isArray(value)

export default isArray
