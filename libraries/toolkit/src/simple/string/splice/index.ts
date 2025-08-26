/**
 * Changes a string by removing/replacing characters at a specific position
 *
 * Similar to Array.splice but for strings. Removes a specified number of
 * characters starting at a given index and optionally inserts a replacement
 * string at that position. Supports negative indices to count from the end.
 * Returns a new string with the modifications applied.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
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
 * // Partial application for common operations
 * const deleteAt = (index: number, count: number) => splice(index)(count)("")
 * const insertAt = (index: number, text: string) => splice(index)(0)(text)
 * deleteAt(0, 3)("foo bar")      // " bar"
 * insertAt(3, "-")("foobar")     // "foo-bar"
 *
 * // Handle null/undefined gracefully
 * splice(0)(1)("H")(null)       // ""
 * splice(0)(1)("H")(undefined)  // ""
 * ```
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
