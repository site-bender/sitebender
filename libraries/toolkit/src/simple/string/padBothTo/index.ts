import repeat from "../repeat/index.ts"

/**
 * Pads a string on both sides to reach a target length
 *
 * Adds padding characters to both the start and end of the string until
 * it reaches the specified target length. If the string is already at or
 * beyond the target length, returns it unchanged. When an odd number of
 * padding characters is needed, the extra character is added at the end.
 *
 * Note: This function is identical to padBothToFromEnd.
 *
 * @curried (chars) => (targetLength) => (str) => result
 * @param chars - The character(s) to use for padding
 * @param targetLength - The desired final length of the string
 * @param str - The string to pad
 * @returns String padded to the target length, or unchanged if already long enough
 * @example
 * ```typescript
 * // Basic usage - even padding
 * padBothTo("-")(10)("hello") // "--hello---" (5 chars → 10 chars, adds 2 + 3)
 * padBothTo("*")(8)("hi")     // "***hi***" (2 chars → 8 chars, adds 3 each side)
 *
 * // Odd padding - extra character at end
 * padBothTo("-")(11)("hello") // "---hello---" (5 chars → 11 chars, adds 3 each side)
 * padBothTo(".")(9)("test")   // "..test..." (4 chars → 9 chars, adds 2 start, 3 end)
 *
 * // String already long enough
 * padBothTo("-")(5)("hello world") // "hello world" (unchanged, already 11 chars)
 * padBothTo("*")(3)("test")        // "test" (unchanged, already 4 chars)
 *
 * // Edge cases
 * padBothTo("-")(0)("hello") // "hello" (target 0 returns unchanged)
 * padBothTo("-")(5)("")      // "--" (empty string padded to 5)
 *
 * // Partial application
 * const centerIn10 = padBothTo(" ")(10)
 * centerIn10("OK")   // "    OK    "
 * centerIn10("DONE") // "   DONE   "
 * ```
 */
const padBothTo =
	(chars: string) => (targetLength: number) => (str: string): string => {
		const padLength = Math.max(0, targetLength - str.length)
		const startPadLength = Math.floor(padLength / 2)
		const endPadLength = padLength - startPadLength
		const startPad = repeat(chars)(startPadLength)
		const endPad = repeat(chars)(endPadLength)
		return `${startPad}${str}${endPad}`
	}

export default padBothTo
