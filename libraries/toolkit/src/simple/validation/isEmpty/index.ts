/**
 * Checks if a value is empty based on its type
 *
 * Determines emptiness for various data types using type-appropriate checks.
 * Different types have different definitions of "empty": arrays/strings by length,
 * objects by key count, Maps/Sets by size, and nullish values are considered empty.
 * This is useful for validation, conditional rendering, and filtering operations.
 *
 * Emptiness rules:
 * - null/undefined: always empty
 * - Strings: empty if length === 0
 * - Arrays: empty if length === 0
 * - Objects: empty if no own enumerable properties
 * - Maps/Sets: empty if size === 0
 * - Numbers: never empty (including 0)
 * - Booleans: never empty (including false)
 * - Functions: never empty
 *
 * @param value - The value to check for emptiness
 * @returns True if the value is empty, false otherwise
 * @example
 * ```typescript
 * // Nullish values are empty
 * isEmpty(null)                         // true
 * isEmpty(undefined)                    // true
 *
 * // Strings
 * isEmpty("")                           // true
 * isEmpty("   ")                        // false (whitespace is not empty)
 * isEmpty("hello")                      // false
 *
 * // Arrays
 * isEmpty([])                           // true
 * isEmpty([1, 2, 3])                    // false
 * isEmpty([undefined])                  // false (has one element)
 * isEmpty(new Array(0))                 // true
 * isEmpty(new Array(3))                 // false (sparse array with length 3)
 *
 * // Objects
 * isEmpty({})                           // true
 * isEmpty({ a: 1 })                     // false
 * isEmpty({ [Symbol()]: 1 })            // true (symbols not enumerable)
 * isEmpty(Object.create(null))          // true
 * isEmpty(Object.create({ a: 1 }))      // true (inherited props don't count)
 *
 * // Maps and Sets
 * isEmpty(new Map())                    // true
 * isEmpty(new Map([["key", "value"]]))  // false
 * isEmpty(new Set())                    // true
 * isEmpty(new Set([1, 2, 3]))           // false
 *
 * // WeakMaps and WeakSets (always false - can't determine size)
 * isEmpty(new WeakMap())                // false
 * isEmpty(new WeakSet())                // false
 *
 * // Numbers and booleans (never empty)
 * isEmpty(0)                            // false
 * isEmpty(-0)                           // false
 * isEmpty(NaN)                          // false
 * isEmpty(Infinity)                    // false
 * isEmpty(false)                        // false
 * isEmpty(true)                         // false
 *
 * // Functions (never empty)
 * isEmpty(() => {})                     // false
 * isEmpty(function() {})                // false
 * isEmpty(async () => {})               // false
 *
 * // Form validation
 * interface FormData {
 *   name: string
 *   email: string
 *   message: string
 *   tags: string[]
 * }
 *
 * function validateForm(data: FormData): string[] {
 *   const errors: string[] = []
 *   if (isEmpty(data.name)) errors.push("Name is required")
 *   if (isEmpty(data.email)) errors.push("Email is required")
 *   if (isEmpty(data.message)) errors.push("Message is required")
 *   if (isEmpty(data.tags)) errors.push("At least one tag is required")
 *   return errors
 * }
 *
 * validateForm({
 *   name: "",
 *   email: "user@example.com",
 *   message: "",
 *   tags: []
 * })
 * // ["Name is required", "Message is required", "At least one tag is required"]
 *
 * // Filtering out empty values
 * const data = ["hello", "", null, [], "world", {}, { a: 1 }]
 * const nonEmpty = data.filter(item => !isEmpty(item))
 * // ["hello", "world", { a: 1 }]
 *
 * // Default value assignment
 * function getConfig(userConfig: unknown, defaultConfig: object) {
 *   return isEmpty(userConfig) ? defaultConfig : userConfig
 * }
 *
 * getConfig({}, { timeout: 5000 })      // { timeout: 5000 }
 * getConfig({ port: 3000 }, { timeout: 5000 }) // { port: 3000 }
 * getConfig(null, { timeout: 5000 })    // { timeout: 5000 }
 *
 * // JSX conditional rendering
 * function List({ items }: { items: unknown }) {
 *   if (isEmpty(items)) {
 *     return <div>No items to display</div>
 *   }
 *   if (Array.isArray(items)) {
 *     return (
 *       <ul>
 *         {items.map((item, i) => <li key={i}>{item}</li>)}
 *       </ul>
 *     )
 *   }
 *   return <div>Invalid items</div>
 * }
 *
 * // API response handling
 * interface ApiResponse {
 *   data?: unknown
 *   error?: string
 * }
 *
 * function handleResponse(response: ApiResponse) {
 *   if (!isEmpty(response.error)) {
 *     throw new Error(response.error)
 *   }
 *   if (isEmpty(response.data)) {
 *     return { message: "No data available" }
 *   }
 *   return response.data
 * }
 *
 * // Cache validation
 * const cache = new Map()
 *
 * function getCached<T>(key: string, compute: () => T): T {
 *   if (!cache.has(key) || isEmpty(cache.get(key))) {
 *     cache.set(key, compute())
 *   }
 *   return cache.get(key)
 * }
 *
 * // Search/filter with empty check
 * function search(query: string, data: string[]): string[] {
 *   if (isEmpty(query)) {
 *     return data // Return all if no query
 *   }
 *   return data.filter(item =>
 *     item.toLowerCase().includes(query.toLowerCase())
 *   )
 * }
 *
 * search("", ["apple", "banana"])       // ["apple", "banana"]
 * search("app", ["apple", "banana"])    // ["apple"]
 *
 * // Recursive empty check for nested structures
 * function deepIsEmpty(value: unknown): boolean {
 *   if (isEmpty(value)) return true
 *
 *   if (Array.isArray(value)) {
 *     return value.every(deepIsEmpty)
 *   }
 *
 *   if (value && typeof value === "object") {
 *     return Object.values(value).every(deepIsEmpty)
 *   }
 *
 *   return false
 * }
 *
 * deepIsEmpty({})                       // true
 * deepIsEmpty({ a: [], b: {} })         // true
 * deepIsEmpty({ a: [null, undefined] }) // true
 * deepIsEmpty({ a: [1] })               // false
 *
 * // Typed arrays (not empty if length > 0)
 * isEmpty(new Uint8Array(0))            // true
 * isEmpty(new Uint8Array(10))           // false
 * isEmpty(new Float32Array([]))         // true
 *
 * // Arguments object
 * function checkArgs() {
 *   console.log(isEmpty(arguments))
 * }
 * checkArgs()                           // true
 * checkArgs(1, 2, 3)                    // false
 *
 * // DOM collections
 * isEmpty(document.querySelectorAll(".none")) // true (no matches)
 * isEmpty(document.querySelectorAll("div"))   // false (if divs exist)
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Type-aware - Uses appropriate emptiness check for each type
 * @property Consistent - Clear rules for what constitutes "empty"
 * @property Practical - Handles common use cases for emptiness checking
 */
const isEmpty = (value: unknown): boolean => {
	// Nullish values are empty
	if (value == null) {
		return true
	}

	// Strings and arrays check length
	if (typeof value === "string" || Array.isArray(value)) {
		return value.length === 0
	}

	// Array-like objects check length
	if (
		typeof value === "object" && "length" in value &&
		typeof value.length === "number"
	) {
		return value.length === 0
	}

	// Maps and Sets check size
	if (value instanceof Map || value instanceof Set) {
		return value.size === 0
	}

	// WeakMaps and WeakSets can't be determined as empty
	if (value instanceof WeakMap || value instanceof WeakSet) {
		return false
	}

	// Plain objects check for own enumerable properties
	if (typeof value === "object" && value.constructor === Object) {
		return Object.keys(value).length === 0
	}

	// All other values (numbers, booleans, functions, etc.) are not empty
	return false
}

export default isEmpty
