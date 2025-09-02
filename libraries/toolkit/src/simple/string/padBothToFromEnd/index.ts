import padBothTo from "../padBothTo/index.ts"

/**
 * Pads a string on both sides to reach a target length, adding extra character at end
 *
 * Adds padding characters to both the start and end of the string until
 * it reaches the specified target length. If the string is already at or
 * beyond the target length, returns it unchanged. When an odd number of
 * padding characters is needed, the extra character is added at the end.
 *
 * Note: This function is an alias for padBothTo as they have identical behavior.
 *
 * @param chars - The character(s) to use for padding
 * @param targetLength - The desired final length of the string
 * @param str - The string to pad
 * @returns String padded to the target length, or unchanged if already long enough
 * @example
 * ```typescript
 * // Basic usage - even padding
 * padBothToFromEnd("-")(10)("hello") // "--hello---" (5 → 10 chars)
 * padBothToFromEnd("*")(8)("hi")     // "***hi***" (2 → 8 chars)
 *
 * // Odd padding - extra character at end
 * padBothToFromEnd(".")(9)("test")   // "..test..." (extra at end)
 *
 * // String already long enough
 * padBothToFromEnd("-")(5)("hello world") // "hello world" (unchanged)
 *
 * // Partial application
 * const centerIn10 = padBothToFromEnd(" ")(10)
 * centerIn10("OK")   // "    OK    "
 * centerIn10("DONE") // "   DONE   "
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const padBothToFromEnd = padBothTo

export default padBothToFromEnd
