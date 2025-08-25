import type { Value } from "../../../types/index.ts"

/**
 * Swaps keys and values in an object
 *
 * Creates a new object where the keys become values and values become keys.
 * Values are converted to strings to serve as keys. If multiple keys have
 * the same value, the last one wins (overwrites previous mappings).
 * Non-string values are converted using String().
 *
 * @param obj - The object to invert
 * @returns A new object with keys and values swapped
 * @example
 * ```typescript
 * // Basic inversion
 * invert({ a: "x", b: "y", c: "z" })
 * // { x: "a", y: "b", z: "c" }
 *
 * invert({ name: "Alice", role: "admin" })
 * // { Alice: "name", admin: "role" }
 *
 * // Number values become string keys
 * invert({ a: 1, b: 2, c: 3 })
 * // { "1": "a", "2": "b", "3": "c" }
 *
 * invert({ first: 100, second: 200 })
 * // { "100": "first", "200": "second" }
 *
 * // Duplicate values - last key wins
 * invert({ a: "x", b: "y", c: "x" })
 * // { x: "c", y: "b" } (c overwrites a for value "x")
 *
 * invert({ id1: 1, id2: 2, id3: 1 })
 * // { "1": "id3", "2": "id2" } (id3 overwrites id1)
 *
 * // Boolean values
 * invert({ active: true, disabled: false })
 * // { "true": "active", "false": "disabled" }
 *
 * // Null and undefined values
 * invert({ a: null, b: undefined, c: "value" })
 * // { "null": "a", "undefined": "b", "value": "c" }
 *
 * // Empty object
 * invert({})
 * // {}
 *
 * // Arrays as values (converted to string)
 * invert({ a: [1, 2], b: [3, 4] })
 * // { "1,2": "a", "3,4": "b" }
 *
 * // Objects as values (converted to string)
 * invert({ a: { x: 1 }, b: { y: 2 } })
 * // { "[object Object]": "b" } (both stringify to same key, b wins)
 *
 * // Symbol keys are included
 * const sym = Symbol("key")
 * invert({ [sym]: "value", regular: "other" })
 * // { "value": Symbol(key), "other": "regular" }
 *
 * // Practical use cases
 *
 * // Reverse mapping for lookups
 * const statusCodes = { success: 200, notFound: 404, error: 500 }
 * const codeToStatus = invert(statusCodes)
 * // { "200": "success", "404": "notFound", "500": "error" }
 * codeToStatus["404"] // "notFound"
 *
 * // Enum reversal
 * const Priority = { LOW: 1, MEDIUM: 2, HIGH: 3 } as const
 * const PriorityNames = invert(Priority)
 * // { "1": "LOW", "2": "MEDIUM", "3": "HIGH" }
 * PriorityNames["2"] // "MEDIUM"
 *
 * // Character mapping reversal
 * const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;" }
 * const unescapeMap = invert(escapeMap)
 * // { "&amp;": "&", "&lt;": "<", "&gt;": ">" }
 *
 * // Finding keys by values
 * const config = { host: "localhost", port: "3000", timeout: "3000" }
 * const inverted = invert(config)
 * // { "localhost": "host", "3000": "timeout" } (timeout overwrites port)
 *
 * // Two-way mapping
 * const dayNames = { mon: "Monday", tue: "Tuesday", wed: "Wednesday" }
 * const namesToAbbr = invert(dayNames)
 * // { "Monday": "mon", "Tuesday": "tue", "Wednesday": "wed" }
 * ```
 * @property Value collision - when multiple keys map to the same value, last one wins
 * @property Type coercion - non-string values are converted to strings for keys
 * @property Symbol support - symbol keys are preserved in the result
 */
const invert = <T extends Record<string | symbol, Value>>(
	obj: T,
): Record<string, string | symbol> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	const result: Record<string, string | symbol> = {}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Swap keys and values
	for (const key of allKeys) {
		const value = obj[key]
		// Convert value to string to use as key (except null/undefined get string representation)
		const newKey = String(value)
		result[newKey] = key
	}

	return result
}

export default invert
