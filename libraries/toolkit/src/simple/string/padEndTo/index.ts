import repeat from "../repeat/index.ts"

/**
 * Pads a string at the end to reach a target length
 *
 * Adds padding characters to the end of the string until it reaches the
 * specified target length. If the string is already at or beyond the target
 * length, returns it unchanged.
 *
 * @curried (chars) => (targetLength) => (str) => result
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
 * padEndTo(" ")(5)("hello world") // "hello world" (unchanged, already 11 chars)
 * padEndTo("-")(3)("12345")       // "12345" (unchanged, already 5 chars)
 *
 * // Edge cases
 * padEndTo("-")(0)("hello") // "hello" (target 0 returns unchanged)
 * padEndTo("*")(5)("")      // "*****" (empty string padded to 5)
 *
 * // Multi-character padding
 * padEndTo("ab")(7)("xyz")  // "xyzabab"
 * padEndTo("123")(10)("!")  // "!123123123"
 *
 * // Partial application
 * const rightAlign = padEndTo(" ")(20)
 * rightAlign("Name:")    // "Name:               "
 * rightAlign("Address:") // "Address:            "
 * rightAlign("Phone:")   // "Phone:              "
 * ```
 */
const padEndTo =
	(chars: string) => (targetLength: number) => (str: string): string =>
		`${str}${repeat(chars)(Math.max(0, targetLength - str.length))}`

export default padEndTo
