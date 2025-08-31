/**
 * Removes all occurrences of a substring from a string
 *
 * Deletes every occurrence of a specified substring from the input string.
 * This is equivalent to replacing all occurrences with an empty string.
 * Useful for cleaning text, removing unwanted characters, or filtering
 * content. The removal is case-sensitive and handles overlapping matches.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param substring - The substring to remove
 * @param str - The string to remove from
 * @returns String with all occurrences removed
 * @example
 * ```typescript
 * // Basic removal
 * remove("l")("hello world")     // "heo word"
 *
 * // Remove all occurrences
 * remove("o")("foo boo zoo")     // "f b z"
 *
 * // Case sensitive
 * remove("The")("the The THE")   // "the  THE"
 *
 * // Not found (unchanged)
 * remove("xyz")("hello world")   // "hello world"
 *
 * // Empty substring (unchanged)
 * remove("")("hello")            // "hello"
 *
 * // Remove spaces
 * remove(" ")("hello world")     // "helloworld"
 *
 * // Partial application
 * const removeSpaces = remove(" ")
 * removeSpaces("a b c")          // "abc"
 * ```
 */
import isNullish from "../../validation/isNullish/index.ts"

const remove = (
	substring: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (isNullish(substring) || typeof substring !== "string" || substring === "") {
		return str
	}

	// Use split and join for efficient removal of all occurrences
	// This handles overlapping matches naturally
	return str.split(substring).join("")
}

export default remove
