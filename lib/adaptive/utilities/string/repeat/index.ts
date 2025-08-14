/**
 * Repeats a string a specified number of times
 * 
 * @param s - The string to repeat
 * @returns Function that takes a length and returns the repeated string
 * @example
 * ```typescript
 * repeat("x")(3) // "xxx"
 * repeat("ab")(2) // "abab"
 * repeat("test")(0) // ""
 * ```
 */
const repeat = (s: string) => (length: number): string =>
	Array.from({ length }).fill(s).join("")

export default repeat
