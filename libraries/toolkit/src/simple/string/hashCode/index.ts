import isNullish from "../../validation/isNullish/index.ts"

/**
 * Generates a consistent hash code for a string
 *
 * Creates a numeric hash code from a string using a variation of the
 * Java String.hashCode() algorithm. Produces a 32-bit integer hash that
 * is deterministic - the same string always produces the same hash.
 * Useful for checksums, cache keys, or simple hash tables.
 *
 * @param str - String to generate hash code for
 * @returns 32-bit integer hash code
 * @example
 * ```typescript
 * // Basic hash generation
 * hashCode("hello")
 * // 99162322
 *
 * // Same input always produces same output
 * hashCode("test") === hashCode("test")
 * // true
 *
 * // Different strings produce different hashes
 * hashCode("hello") !== hashCode("world")
 * // true
 *
 * // Empty string and null handling
 * hashCode("")         // 0
 * hashCode(null)       // 0
 * hashCode(undefined)  // 0
 *
 * // Case sensitive
 * hashCode("Hello") !== hashCode("hello")
 * // true
 *
 * // Unicode support
 * hashCode("Hello 世界 🌍")
 * // Works with all Unicode characters
 *
 * // Use as cache key
 * const cache: Record<number, string> = {}
 * const key = hashCode("user:123:profile")
 * cache[key] = "cached data"
 *
 * // Hash table bucket distribution
 * const bucketIndex = Math.abs(hashCode("key")) % 10
 *
 * // String comparison optimization
 * const quickCompare = (s1: string, s2: string) => {
 *   if (hashCode(s1) !== hashCode(s2)) return false
 *   return s1 === s2  // Only do full comparison if hashes match
 * }
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify input
 * @safe - Returns safe values for invalid inputs
 */
const hashCode = (
	str: string | null | undefined,
): number => {
	if (isNullish(str) || typeof str !== "string") {
		return 0
	}

	if (str.length === 0) {
		return 0
	}

	const result = str.split("").reduce((hash, char) => {
		const code = char.charCodeAt(0)
		const newHash = ((hash << 5) - hash) + code
		// Convert to 32-bit integer
		return newHash | 0
	}, 0)

	return result
}

export default hashCode
