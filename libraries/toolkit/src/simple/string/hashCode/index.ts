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
 * // Empty string
 * hashCode("")
 * // 0
 * 
 * // Single character
 * hashCode("a")
 * // 97
 * 
 * // Whitespace matters
 * hashCode("hello") !== hashCode("hello ")
 * // true
 * 
 * // Case sensitive
 * hashCode("Hello") !== hashCode("hello")
 * // true
 * 
 * // Long strings
 * hashCode("Lorem ipsum dolor sit amet, consectetur adipiscing elit")
 * // Consistent hash value
 * 
 * // Unicode support
 * hashCode("Hello 世界 🌍")
 * // Works with all Unicode characters
 * 
 * // Use as object key
 * const cache: Record<number, string> = {}
 * const key = hashCode("user:123:profile")
 * cache[key] = "cached data"
 * 
 * // Use for simple hash table
 * const bucketIndex = Math.abs(hashCode("key")) % bucketCount
 * 
 * // Use for checksums
 * const checksum = hashCode(JSON.stringify(data))
 * 
 * // Compare file contents
 * const file1Hash = hashCode(file1Content)
 * const file2Hash = hashCode(file2Content)
 * if (file1Hash === file2Hash) {
 *   console.log("Files might be identical")
 * }
 * 
 * // Generate cache keys
 * const cacheKey = hashCode(`${userId}:${resource}:${timestamp}`)
 * 
 * // Simple string comparison optimization
 * const quickCompare = (s1: string, s2: string) => {
 *   if (hashCode(s1) !== hashCode(s2)) return false
 *   return s1 === s2  // Only do full comparison if hashes match
 * }
 * 
 * // Distribute items across buckets
 * const distributeItems = (items: Array<string>, buckets: number) => {
 *   const distributed: Array<Array<string>> = Array(buckets).fill(null).map(() => [])
 *   items.forEach(item => {
 *     const bucket = Math.abs(hashCode(item)) % buckets
 *     distributed[bucket].push(item)
 *   })
 *   return distributed
 * }
 * 
 * // Handle null/undefined
 * hashCode(null)       // 0
 * hashCode(undefined)  // 0
 * 
 * // Numbers and special characters
 * hashCode("123!@#")
 * // Consistent hash for any string
 * 
 * // Multi-line strings
 * hashCode(`
 *   Line 1
 *   Line 2
 *   Line 3
 * `)
 * // Handles newlines and indentation
 * 
 * // Use for deduplication
 * const unique = Array.from(new Set(strings.map(hashCode)))
 *   .map(hash => strings.find(s => hashCode(s) === hash))
 * 
 * // Simple bloom filter element
 * const bloomAdd = (filter: Set<number>, str: string) => {
 *   filter.add(hashCode(str))
 *   filter.add(hashCode(str + "salt1"))
 *   filter.add(hashCode(str + "salt2"))
 * }
 * 
 * // Version comparison
 * const contentChanged = hashCode(oldContent) !== hashCode(newContent)
 * ```
 * @property Deterministic - same input always produces same output
 * @property Fast - O(n) where n is string length
 * @property Distribution - reasonable distribution for hash table use
 */
const hashCode = (
	str: string | null | undefined
): number => {
	if (str == null || typeof str !== "string") {
		return 0
	}
	
	if (str.length === 0) {
		return 0
	}
	
	let hash = 0
	
	// Use the Java String.hashCode() algorithm
	// hash = s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = ((hash << 5) - hash) + char
		// Convert to 32-bit integer
		hash = hash | 0
	}
	
	return hash
}

export default hashCode