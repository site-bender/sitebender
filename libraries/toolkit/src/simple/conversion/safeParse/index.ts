/**
 * Safely parses a value with a parser function, returning null on failure
 *
 * Wraps any parser function to catch errors and return null instead of
 * throwing. This provides a consistent interface for safe parsing operations
 * that can be easily composed with Result/Either monads. The parser function
 * should throw an error or return undefined for invalid inputs.
 *
 * @curried (parser) => (value) => result
 * @param parser - Function that parses the value, may throw on failure
 * @param value - The value to parse
 * @returns The parsed value or null if parsing fails
 * @example
 * ```typescript
 * // Basic JSON parsing
 * const parseJson = safeParse(JSON.parse)
 * parseJson('{"name": "John"}')          // { name: "John" }
 * parseJson('invalid json')              // null
 * parseJson('')                          // null
 *
 * // Number parsing with custom logic
 * const parsePositive = safeParse((v: string) => {
 *   const num = Number(v)
 *   if (isNaN(num) || num <= 0) {
 *     throw new Error("Not a positive number")
 *   }
 *   return num
 * })
 * parsePositive("42")                    // 42
 * parsePositive("-5")                    // null
 * parsePositive("abc")                   // null
 *
 * // Date parsing
 * const parseDate = safeParse((v: string) => {
 *   const date = new Date(v)
 *   if (isNaN(date.getTime())) {
 *     throw new Error("Invalid date")
 *   }
 *   return date
 * })
 * parseDate("2024-03-15")                // Date object
 * parseDate("invalid")                   // null
 *
 * // URL parsing
 * const parseUrl = safeParse((v: string) => new URL(v))
 * parseUrl("https://example.com")        // URL object
 * parseUrl("not a url")                  // null
 *
 * // RegExp parsing
 * const parseRegex = safeParse((v: string) => new RegExp(v))
 * parseRegex("^test.*")                  // RegExp object
 * parseRegex("[invalid")                 // null (invalid regex)
 *
 * // Custom object parsing
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 *
 * const parseUser = safeParse((v: string): User => {
 *   const data = JSON.parse(v)
 *   if (!data.id || !data.name || !data.email) {
 *     throw new Error("Missing required fields")
 *   }
 *   return {
 *     id: Number(data.id),
 *     name: String(data.name),
 *     email: String(data.email)
 *   }
 * })
 *
 * parseUser('{"id":1,"name":"Alice","email":"alice@example.com"}')
 * // { id: 1, name: "Alice", email: "alice@example.com" }
 *
 * parseUser('{"name":"Bob"}')            // null (missing fields)
 * parseUser('not json')                  // null
 *
 * // Chaining parsers
 * const parseConfig = safeParse((v: string) => {
 *   const json = JSON.parse(v)
 *   return {
 *     port: parseInt(json.port),
 *     debug: json.debug === "true",
 *     timeout: parseFloat(json.timeout)
 *   }
 * })
 *
 * parseConfig('{"port":"3000","debug":"true","timeout":"5.5"}')
 * // { port: 3000, debug: true, timeout: 5.5 }
 *
 * // Composing with other functions
 * import { pipe } from "../../combinator/pipe"
 * import { map } from "../../array/map"
 *
 * const parseNumbers = safeParse((v: string) => {
 *   const nums = v.split(",").map(Number)
 *   if (nums.some(isNaN)) {
 *     throw new Error("Invalid numbers")
 *   }
 *   return nums
 * })
 *
 * const processNumbers = pipe(
 *   parseNumbers,
 *   (nums) => nums ? map((n: number) => n * 2)(nums) : null
 * )
 *
 * processNumbers("1,2,3")                // [2, 4, 6]
 * processNumbers("1,a,3")                // null
 *
 * // Handling different failure modes
 * const strictParse = safeParse((v: unknown) => {
 *   if (v === undefined) throw new Error("Undefined not allowed")
 *   if (v === null) throw new Error("Null not allowed")
 *   if (v === "") throw new Error("Empty string not allowed")
 *   return String(v)
 * })
 *
 * strictParse("hello")                   // "hello"
 * strictParse(undefined)                 // null
 * strictParse(null)                      // null
 * strictParse("")                        // null
 *
 * // API response parsing
 * async function fetchData(url: string) {
 *   const response = await fetch(url)
 *   const text = await response.text()
 *
 *   const parser = safeParse((t: string) => {
 *     const data = JSON.parse(t)
 *     if (!data.success) {
 *       throw new Error(data.error || "Request failed")
 *     }
 *     return data.result
 *   })
 *
 *   return parser(text)
 * }
 * ```
 * @property Pure - Always returns same result for same input and parser
 * @property Safe - Never throws, returns null on any parsing failure
 * @property Curried - Parser can be partially applied for reuse
 * @property Composable - Works well with functional composition patterns
 */
const safeParse =
	<T>(parser: (value: unknown) => T) => (value: unknown): T | null => {
		try {
			const result = parser(value)
			// Return null if parser returns undefined
			return result === undefined ? null : result
		} catch {
			// Return null for any parsing errors
			return null
		}
	}

export default safeParse
