/**
 * Removes a prefix from a string if present
 * 
 * Strips a specified prefix from the beginning of a string, but only if
 * the string actually starts with that prefix. If the prefix is not found
 * at the start, returns the original string unchanged. This is useful for
 * cleaning URLs, file paths, namespaces, or any prefixed identifiers.
 * 
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param prefix - The prefix to remove
 * @param str - The string to remove prefix from
 * @returns String with prefix removed if it was present
 * @example
 * ```typescript
 * // Basic prefix removal
 * removePrefix("Mr. ")("Mr. Smith")    // "Smith"
 * 
 * // Prefix not present (unchanged)
 * removePrefix("Mr. ")("Mrs. Smith")   // "Mrs. Smith"
 * 
 * // Case sensitive
 * removePrefix("MR. ")("Mr. Smith")    // "Mr. Smith"
 * 
 * // Empty prefix (unchanged)
 * removePrefix("")("hello")            // "hello"
 * 
 * // URL protocol removal
 * removePrefix("https://")("https://example.com")  // "example.com"
 * 
 * // File path cleaning
 * removePrefix("/usr/local/")("/usr/local/bin/node")  // "bin/node"
 * 
 * // Partial application
 * const removeHttps = removePrefix("https://")
 * removeHttps("https://example.com")   // "example.com"
 * ```
 */
const removePrefix = (
	prefix: string | null | undefined
) => (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	if (prefix == null || typeof prefix !== "string" || prefix === "") {
		return str
	}
	
	// Only remove if string starts with the prefix
	return str.startsWith(prefix) 
		? str.slice(prefix.length)
		: str
}

export default removePrefix