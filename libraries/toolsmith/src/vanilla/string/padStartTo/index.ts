import repeat from "../repeat/index.ts"

/**
 * Pads a string at the start to reach a target length
 *
 * Adds padding characters to the start of the string until it reaches the
 * specified target length. If the string is already at or beyond the target
 * length, returns it unchanged.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param chars - The character(s) to use for padding
 * @param targetLength - The desired final length of the string
 * @param str - The string to pad
 * @returns String padded to the target length, or unchanged if already long enough
 * @example
 * ```typescript
 * // Basic usage
 * padStartTo("0")(5)("42")     // "00042"
 * padStartTo("-")(10)("test")  // "------test"
 *
 * // String already long enough
 * padStartTo("0")(3)("12345")  // "12345" (unchanged)
 *
 * // Multi-character padding
 * padStartTo("ab")(7)("xyz")   // "ababxyz"
 *
 * // Empty string
 * padStartTo("*")(5)("")       // "*****"
 *
 * // Target length zero
 * padStartTo("-")(0)("hello")  // "hello" (unchanged)
 *
 * // Partial application
 * const padWithZeros = padStartTo("0")(8)
 * padWithZeros("1")      // "00000001"
 * padWithZeros("12345")  // "00012345"
 * ```
 */
const padStartTo =
	(chars: string) => (targetLength: number) => (str: string): string =>
		`${repeat(chars)(Math.max(0, targetLength - str.length))}${str}`

export default padStartTo
