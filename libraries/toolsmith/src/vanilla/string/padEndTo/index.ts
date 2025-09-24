import repeat from "../repeat/index.ts"

/**
 * Pads a string at the end to reach a target length
 *
 * Adds padding characters to the end of the string until it reaches the
 * specified target length. If the string is already at or beyond the target
 * length, returns it unchanged.
 *
 * @param chars - The character(s) to use for padding
 * @param targetLength - The desired final length of the string
 * @param str - The string to pad
 * @returns String padded to the target length, or unchanged if already long enough
 * @example
 * ```typescript
 * // Basic usage
 * padEndTo(".")(10)("Hello") // "Hello....."
 * padEndTo("-")(8)("test")   // "test----"
 * padEndTo(" ")(15)("Name")  // "Name           "
 *
 * // String already long enough
 * padEndTo(" ")(5)("hello world") // "hello world" (unchanged)
 * padEndTo("-")(3)("12345")       // "12345" (unchanged)
 *
 * // Edge cases
 * padEndTo("-")(0)("hello") // "hello" (target 0 unchanged)
 * padEndTo("*")(5)("")      // "*****" (empty string padded)
 *
 * // Multi-character padding
 * padEndTo("ab")(7)("xyz")  // "xyzabab"
 *
 * // Partial application
 * const rightAlign = padEndTo(" ")(20)
 * rightAlign("Name:")    // "Name:               "
 * rightAlign("Address:") // "Address:            "
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const padEndTo =
	(chars: string) => (targetLength: number) => (str: string): string =>
		`${str}${repeat(chars)(Math.max(0, targetLength - str.length))}`

export default padEndTo
