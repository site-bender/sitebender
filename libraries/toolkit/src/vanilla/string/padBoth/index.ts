import repeat from "../repeat/index.ts"

/**
 * Pads a string on both sides by adding a specified number of characters
 *
 * Adds the specified number of padding characters to both the start and end
 * of the string, regardless of the string's current length. The total number
 * of characters added will be double the specified amount (count on each side).
 *
 * @param chars - The character(s) to use for padding
 * @param count - Number of times to repeat the padding on each side
 * @param str - The string to pad
 * @returns String with padding added to both sides
 * @example
 * ```typescript
 * // Basic usage
 * padBoth("-")(3)("hello") // "---hello---"
 * padBoth("*")(2)("hi")    // "**hi**"
 * padBoth(".")(0)("test")  // "test"
 *
 * // Multi-character padding
 * padBoth("><")(2)("fish") // "><><fish><><"
 *
 * // Partial application
 * const addBrackets = padBoth("[]")(1)
 * addBrackets("content") // "[]content[]"
 * addBrackets("data")    // "[]data[]"
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const padBoth = (chars: string) => (count: number) => (str: string): string => {
	const padding = repeat(chars)(Math.max(0, count))
	return `${padding}${str}${padding}`
}

export default padBoth
