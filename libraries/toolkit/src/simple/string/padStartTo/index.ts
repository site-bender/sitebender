import repeat from "../repeat/index.ts"

/**
 * Pads a string at the start to reach a target length
 *
 * Adds padding characters to the start of the string until it reaches the
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
 * padStartTo(".")(15)("yo yo yo") // ".......yo yo yo"
 * padStartTo("0")(5)("42")        // "00042"
 * padStartTo("-")(10)("test")     // "------test"
 *
 * // String already long enough
 * padStartTo(" ")(5)("hello world") // "hello world" (unchanged, already 11 chars)
 * padStartTo("0")(3)("12345")       // "12345" (unchanged, already 5 chars)
 *
 * // Edge cases
 * padStartTo("-")(0)("hello") // "hello" (target 0 returns unchanged)
 * padStartTo("*")(5)("")      // "*****" (empty string padded to 5)
 *
 * // Multi-character padding
 * padStartTo("ab")(7)("xyz") // "ababxyz"
 * padStartTo("123")(10)("!")  // "123123123!"
 *
 * // Partial application
 * const padWithZeros = padStartTo("0")(8)
 * padWithZeros("1")     // "00000001"
 * padWithZeros("999")   // "00000999"
 * padWithZeros("12345") // "00012345"
 * ```
 */
const padStartTo =
	(chars: string) => (targetLength: number) => (str: string): string =>
		`${repeat(chars)(Math.max(0, targetLength - str.length))}${str}`

export default padStartTo
