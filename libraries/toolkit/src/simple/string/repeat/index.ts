/**
 * Repeats a string a specified number of times
 *
 * Creates a new string by concatenating the input string with itself
 * the specified number of times. Returns an empty string for counts
 * less than or equal to zero.
 *
 * @curried (str) => (count) => result
 * @param str - The string to repeat
 * @param count - Number of times to repeat the string
 * @returns New string containing the input repeated count times
 * @example
 * ```typescript
 * // Basic usage
 * repeat("x")(3)     // "xxx"
 * repeat("ab")(2)    // "abab"
 * repeat("hello")(1) // "hello"
 * repeat("*-")(4)    // "*-*-*-*-"
 *
 * // Edge cases
 * repeat("test")(0)  // ""
 * repeat("test")(-1) // ""
 * repeat("")(5)      // ""
 *
 * // Partial application
 * const stars = repeat("*")
 * stars(5)  // "*****"
 * stars(10) // "**********"
 *
 * const divider = repeat("-=")
 * divider(3)  // "-=-=-="
 * divider(5)  // "-=-=-=-=-=-=-="
 *
 * // Building patterns
 * const indent = repeat("  ")
 * indent(0) // ""
 * indent(1) // "  "
 * indent(2) // "    "
 * indent(3) // "      "
 *
 * // Length property
 * repeat("abc")(4).length // 12 (3 * 4)
 * repeat("x")(10).length  // 10 (1 * 10)
 * ```
 */
const repeat = (str: string) => (count: number): string =>
	count > 0 ? Array.from({ length: count }).fill(str).join("") : ""

export default repeat
