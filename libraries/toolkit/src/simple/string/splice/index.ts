/**
 * Changes a string by removing/replacing characters at a specific position
 *
 * Similar to Array.splice but for strings. Removes a specified number of
 * characters starting at a given index and optionally inserts a replacement
 * string at that position. Supports negative indices to count from the end.
 * Returns a new string with the modifications applied.
 *
 * @curried (start) => (deleteCount) => (replacement?) => (str) => string
 * @param start - Starting index (negative counts from end)
 * @param deleteCount - Number of characters to remove
 * @param replacement - Optional string to insert at position
 * @param str - String to splice
 * @returns Modified string
 * @example
 * ```typescript
 * // Remove characters
 * splice(5)(5)("")("hello world")
 * // "hello"
 *
 * // Replace characters
 * splice(6)(5)("universe")("hello world")
 * // "hello universe"
 *
 * // Insert without removing
 * splice(5)(0)(" beautiful")("hello world")
 * // "hello beautiful world"
 *
 * // Negative index
 * splice(-5)(5)("earth")("hello world")
 * // "hello earth"
 *
 * // Remove from end
 * splice(-3)(3)("")("hello world")
 * // "hello wo"
 *
 * // Replace single character
 * splice(0)(1)("H")("hello")
 * // "Hello"
 *
 * // Insert at beginning
 * splice(0)(0)("Well, ")("hello")
 * // "Well, hello"
 *
 * // Insert at end
 * splice(5)(0)(" world")("hello")
 * // "hello world"
 *
 * // Delete all after index
 * splice(5)(Infinity)("")("hello world")
 * // "hello"
 *
 * // Partial application for common operations
 * const deleteAt = (index: number, count: number) => splice(index)(count)("")
 * const insertAt = (index: number, text: string) => splice(index)(0)(text)
 * const replaceAt = (index: number, count: number, text: string) =>
 *   splice(index)(count)(text)
 *
 * deleteAt(0, 3)("foo bar")      // " bar"
 * insertAt(3, "-")("foobar")     // "foo-bar"
 * replaceAt(0, 4, "baz")("foo bar") // "baz bar"
 *
 * // Redact sensitive data
 * const redact = (start: number, length: number) =>
 *   splice(start)(length)("*".repeat(length))
 * redact(4, 4)("1234-5678-9012")  // "1234-****-9012"
 *
 * // Fix typos
 * splice(7)(3)("the")("hello teh world")
 * // "hello the world"
 *
 * // Handle null/undefined gracefully
 * splice(0)(1)("H")(null)       // ""
 * splice(0)(1)("H")(undefined)  // ""
 *
 * // Out of bounds handling
 * splice(100)(5)("")("hello")   // "hello"
 * splice(-100)(5)("")("hello")  // "lo"
 *
 * // File extension replacement
 * const changeExt = (newExt: string) => (filename: string) => {
 *   const dotIndex = filename.lastIndexOf(".")
 *   return dotIndex === -1
 *     ? filename + newExt
 *     : splice(dotIndex)(Infinity)(newExt)(filename)
 * }
 * changeExt(".ts")("script.js")  // "script.ts"
 * ```
 * @property Index-based - operates at specific position
 * @property Immutable - returns new string
 * @property Flexible - can remove, replace, or insert
 */
const splice = (
	start: number,
) =>
(
	deleteCount: number,
) =>
(
	replacement: string = "",
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	// Normalize negative index
	const actualStart = start < 0
		? Math.max(0, str.length + start)
		: Math.min(start, str.length)

	// Calculate actual delete count
	const actualDeleteCount = Math.min(
		Math.max(0, deleteCount),
		str.length - actualStart,
	)

	// Build result: before + replacement + after
	return str.slice(0, actualStart) +
		replacement +
		str.slice(actualStart + actualDeleteCount)
}

export default splice
