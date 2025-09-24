import type { Value } from "../../../types/index.ts"

/**
 * Swaps keys and values in an object
 *
 * Creates a new object where the keys become values and values become keys.
 * Values are converted to strings to serve as keys. If multiple keys have
 * the same value, the last one wins (overwrites previous mappings).
 * Non-string values are converted using String().
 *
 * @pure
 * @immutable
 * @param obj - The object to invert
 * @returns A new object with keys and values swapped
 * @example
 * ```typescript
 * // Basic inversion
 * invert({ a: "x", b: "y", c: "z" })
 * // { x: "a", y: "b", z: "c" }
 *
 * // Number values become string keys
 * invert({ a: 1, b: 2, c: 3 })
 * // { "1": "a", "2": "b", "3": "c" }
 *
 * // Duplicate values - last key wins
 * invert({ a: "x", b: "y", c: "x" })
 * // { x: "c", y: "b" } (c overwrites a)
 *
 * // Reverse mapping for lookups
 * const statusCodes = { success: 200, notFound: 404, error: 500 }
 * const codeToStatus = invert(statusCodes)
 * // { "200": "success", "404": "notFound", "500": "error" }
 * codeToStatus["404"] // "notFound"
 *
 * // Character mapping reversal
 * const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;" }
 * const unescapeMap = invert(escapeMap)
 * // { "&amp;": "&", "&lt;": "<", "&gt;": ">" }
 * ```
 */
const invert = <T extends Record<string | symbol, Value>>(
	obj: T,
): Record<string, string | symbol> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Swap keys and values using reduce
	return allKeys.reduce(
		(acc, key) => {
			const value = obj[key]
			// Convert value to string to use as key
			const newKey = String(value)
			return { ...acc, [newKey]: key }
		},
		{} as Record<string, string | symbol>,
	)
}

export default invert
