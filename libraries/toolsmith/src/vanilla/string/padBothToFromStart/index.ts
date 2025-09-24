import repeat from "../repeat/index.ts"

/**
 * Pads a string on both sides to reach a target length, adding extra character at start
 *
 * Adds padding characters to both the start and end of the string until
 * it reaches the specified target length. If the string is already at or
 * beyond the target length, returns it unchanged. When an odd number of
 * padding characters is needed, the extra character is added at the start.
 *
 * @param chars - The character(s) to use for padding
 * @param targetLength - The desired final length of the string
 * @param str - The string to pad
 * @returns String padded to the target length, or unchanged if already long enough
 * @example
 * ```typescript
 * // Basic usage - even padding
 * padBothToFromStart("-")(10)("hello") // "--hello---" (5 → 10 chars)
 * padBothToFromStart("*")(8)("hi")     // "***hi***" (2 → 8 chars)
 *
 * // Odd padding - extra character at start
 * padBothToFromStart(".")(9)("test")   // "...test.." (extra at start)
 *
 * // String already long enough
 * padBothToFromStart("-")(5)("hello world") // "hello world" (unchanged)
 *
 * // Partial application
 * const centerIn10 = padBothToFromStart(" ")(10)
 * centerIn10("OK")   // "    OK    "
 * centerIn10("DONE") // "   DONE   "
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const padBothToFromStart =
	(chars: string) => (targetLength: number) => (str: string): string => {
		const padLength = Math.max(0, targetLength - str.length)
		const endPadLength = Math.floor(padLength / 2)
		const startPadLength = padLength - endPadLength
		const startPad = repeat(chars)(startPadLength)
		const endPad = repeat(chars)(endPadLength)
		return `${startPad}${str}${endPad}`
	}

export default padBothToFromStart
