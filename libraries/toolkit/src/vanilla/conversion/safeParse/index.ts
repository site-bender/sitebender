import isUndefined from "../../validation/isUndefined/index.ts"
import type { Value } from "../../../types/index.ts"

/**
 * Safely parses a value with a parser function, returning null on failure
 *
 * Wraps any parser function to catch errors and return null instead of
 * throwing. This provides a consistent interface for safe parsing operations
 * that can be easily composed with Result/Either monads. The parser function
 * should throw an error or return undefined for invalid inputs.
 *
 * @pure
 * @safe
 * @curried
 * @param parser - Function that parses the value, may throw on failure
 * @param value - The value to parse
 * @returns The parsed value or null if parsing fails
 * @example
 * ```typescript
 * // Basic JSON parsing
 * const parseJson = safeParse(JSON.parse)
 * parseJson('{"name": "John"}')          // { name: "John" }
 * parseJson('invalid json')              // null
 *
 * // Custom parsers with validation
 * const parsePositive = safeParse((v: string) => {
 *   const num = Number(v)
 *   if (isNaN(num) || num <= 0) {
 *     throw new Error("Not a positive number")
 *   }
 *   return num
 * })
 * parsePositive("42")                    // 42
 * parsePositive("-5")                    // null
 *
 * // URL and Date parsing
 * const parseUrl = safeParse((v: string) => new URL(v))
 * parseUrl("https://example.com")        // URL object
 * parseUrl("not a url")                  // null
 *
 * // Composing with pipe
 * const parseNumbers = safeParse((v: string) => {
 *   const nums = v.split(",").map(Number)
 *   if (nums.some(isNaN)) throw new Error("Invalid")
 *   return nums
 * })
 * parseNumbers("1,2,3")                  // [1, 2, 3]
 * parseNumbers("1,a,3")                  // null
 * ```
 */
export default function safeParse<T>(
	parser: (value?: Value) => T,
): (value?: Value) => T | null {
	return function safeParseInner(value?: Value): T | null {
		try {
			const result = parser(value)
			// Return null if parser returns undefined
			return isUndefined(result) ? null : result
		} catch {
			// Return null for any parsing errors
			return null
		}
	}
}
